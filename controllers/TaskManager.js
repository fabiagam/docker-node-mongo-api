/*************************************
 * Task Controller
 * @file: controllers/TaskManager.js
 * @author: James Abiagam
 ************************************/
"use  strict";
require("dotenv").config();
const User = require("../models/User");
const { verifyToken } = require("../lib/Helpers");

// get Tasks
exports.dashboard = async (req, res) => {
  const token = req.headers["x-access-token"];
  let ret = await verifyToken(token);
  console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  // Do other stuff
  return res.status(ret.status).send({
    status: "success",
    data: ret.data,
    message: ret.message,
  });
};
// Edit task
exports.editTask = async (req, res) => {
  const token = req.headers["x-access-token"];
  let ret = await verifyToken(token);
  console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  // Do other stuff
  return res.status(ret.status).send({
    status: "success",
    data: ret.data,
    message: ret.message,
  });
};
// Update task
exports.updateTask = async (req, res) => {
  const token = req.headers["x-access-token"];
  let ret = await verifyToken(token);
  console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  // Do other stuff
  return res.status(ret.status).send({
    status: "success",
    data: ret.data,
    message: ret.message,
  });
};
// Delete task
exports.deleteTask = async (req, res) => {
  const token = req.headers["x-access-token"];
  let ret = await verifyToken(token);
  console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  // Do other stuff
  return res.status(ret.status).send({
    status: "success",
    data: ret.data,
    message: ret.message,
  });
};
