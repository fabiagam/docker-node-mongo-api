/***************************************
 * Helper Library
 * @file: lib/Helper.js
 * @author: James N. Abiagam
 ****************************************/
"use  strict";
require("dotenv").config();
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const date = require("./DateHelper");

const hashPassword = (password) => {
  let salt = 10;
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (inputPassword, hashedPassword) => {
  if (bcrypt.compareSync(inputPassword, hashedPassword)) {
    // Passwords match
    return true;
  } else {
    // Passwords didn't match
    return false;
  }
};

const verifyToken = async (token) => {
  //console.log(`Token  - ${token}`);
  if (!token) {
    return {
      auth: "false",
      message: "No authorization token provided",
      status: 403,
      data: { auth: "unauthorized", token: null },
    }; // Status = 403 = "No token provided."
  } else {
    try {
      let decoded = await validateToken(token); //verify
      let currentTime = Math.round(Number(date.getCurrentTimestamp() / 1000));
      console.log(`Current time converted - ${currentTime}`);
      if (decoded === undefined) {
        return {
          auth: "false",
          message: "Session has expired. Please sign in to continue",
          data: { auth: "expired", token: null },
          status: 200,
        };
      } else if (
        currentTime > Number(decoded.iat) &&
        currentTime <= Number(decoded.exp)
      ) {
        //let user = await User.getProfile(decoded.id);
        return {
          auth: "true",
          data: { auth: "active", token: token, uid: decoded.id },
          message: "Passed Authentication",
          status: 200,
        };
      } else {
        return {
          auth: "false",
          message: "Session has expired. Please sign in to continue",
          data: { auth: "expired", token: null },
          status: 200,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        auth: "false",
        message: "Session has expired. Please sign in to continue",
        data: { auth: "expired", token: null },
        status: 200,
      };
    }
  }
};

const validateToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      console.log(`Current Auth Token - ${JSON.stringify(decoded)}`);
      if (err) {
        return reject(err);
      } else {
        return resolve(decoded);
      }
    });
  });
};

const getUser = async (uid) => {
  return await User.getProfile(uid);
};

module.exports = { hashPassword, verifyPassword, verifyToken };
