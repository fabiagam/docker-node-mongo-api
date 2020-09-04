/*************************************
 * Users Controller
 * @file: controllers/User.js
 * @author: James Abiagam
 ************************************/
"use  strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sanitizer = require("sanitizer");
const { validateUser } = require("../lib/ValidationHelper");
const User = require("../models/User");
const { verifyToken, verifyPassword } = require("../lib/Helpers");

exports.register = async (req, res) => {
  let frm = req.body;
  const { error } = validateUser(frm);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let check = await User.checkProfile(frm);
    if (check)
      return res
        .status(200)
        .send(
          `Oops!. A profile with this email - ${frm.email} already exists. Please try again.`
        );
    let result = await User.saveProfile(frm);
    // create a token // expires in 24 hours = 86400 , 2hours = 7200
    let token = jwt.sign({ id: result._id }, process.env.SECRET, {
      expiresIn: 7200,
    });
    let ret = setResponseObject(result, token);
    return res.status(200).send({
      status: "success",
      data: ret,
      message: "Profile created successfully",
    });
  } catch (e) {
    console.log(new Error(e.message));
    return res.status(404).send(e.message);
  }
};

exports.signin = async (req, res) => {
  let frm = req.body;
  try {
    let check = await User.checkProfile(frm);
    if (!check) {
      return res.status(200).send({
        status: "error",
        data: null,
        message: "User account not found",
      });
    } else {
      if (verifyPassword(frm.password, check.password)) {
        // create a token // expires in 24 hours = 86400 , 2hours = 7200
        let token = jwt.sign({ id: check._id }, process.env.SECRET, {
          expiresIn: 7200,
        });
        // Update last login
        let _result = await User.updateLastLogin(check._id);
        check.last_login = _result.last_login;
        let ret = setResponseObject(check, token);
        return res.status(200).send({
          status: "success",
          data: ret,
          message: "Signed in to your account successfully",
        });
      } else {
        return res.status(200).send({
          status: "error",
          data: null,
          message: "Invalid email or password , Please try again",
        });
      }
    }
  } catch (e) {
    return res
      .status(200)
      .send({ status: "error", data: null, message: e.message });
  }
};

exports.signout = async (req, res) => {};

exports.show = async (req, res) => {
  const token = req.headers["x-access-token"];
  let ret = await verifyToken(token);
  console.log(`Returned verification check - ${JSON.stringify(ret)}`);
  return res.status(ret.status).send({
    status: "success",
    data: ret.data,
    message: ret.message,
  });
};

const setResponseObject = (result, token) => {
  let obj = {};
  obj.firstname = result.firstname;
  obj.lastname = result.lastname;
  obj.email = result.email;
  obj.last_login = result.last_login;
  obj.token = token;
  obj.auth = "active";
  return obj;
};
