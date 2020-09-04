/*************************************
 * Task Controller
 * @file: controllers/TaskManager.js
 * @author: James Abiagam
 ************************************/
"use  strict";
require("dotenv").config();
const Task = require("../models/Task");
const { verifyToken } = require("../lib/Helpers");

// get Tasks
exports.dashboard = async (req, res) => {
  const token = req.headers["x-access-token"];
  let ret = await verifyToken(token);
  //console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  // Fetch and return tasks if access token is active
  try {
    if (ret.data.auth === "active") {
      let result = await Task.getAllByUserId(ret.data.uid);
      let taskCount = result
        ? `${result.length} task(s) found in the database.`
        : ` No tasks found in the database`;
      return res.status(ret.status).send({
        status: "success",
        data: result,
        message: taskCount,
      });
    } else {
      return res.status(ret.status).send({
        status: "success",
        data: ret.data,
        message: ret.message,
      });
    }
  } catch (e) {
    return res.status(404).send({
      status: "error",
      data: null,
      message: e.message,
    });
  }
};

const helloWorld = ()=>{
	console.log('Hello world!');	1
}

// Add new task
exports.addTask = async (req, res) => {
  const token = req.headers["x-access-token"];
  let frm = req.body;
  console.log(`New task - ${JSON.stringify(frm)}`);
  let ret = await verifyToken(token);
  // console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  try {
    if (ret.data.auth === "active") {
      frm.userid = ret.data.uid;
      let result = await Task.add(frm);
      // console.log(`Newly created task - ${JSON.stringify(result)}`);
      return res.status(ret.status).send({
        status: "success",
        data: result,
        message: "Added New Task successfully",
      });
    } else {
      return res.status(ret.status).send({
        status: "success",
        data: ret.data,
        message: ret.message,
      });
    }
  } catch (e) {
    return res.status(404).send({
      status: "error",
      data: null,
      message: e.message,
    });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const token = req.headers["x-access-token"];
  let uid = req.params.id;
  let frm = req.body;
  // console.log(`Update body - ${JSON.stringify(frm)}`);
  //console.log(`Task ID - ${uid}`);
  let ret = await verifyToken(token);
  // console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  try {
    if (ret.data.auth === "active") {
      let result = await Task.updateRecord(uid, frm);
      console.log(`updated - ${JSON.stringify(result)}`);
      return res.status(ret.status).send({
        status: "success",
        data: result,
        message: "Task updated successfully",
      });
    } else {
      return res.status(ret.status).send({
        status: "success",
        data: ret.data,
        message: ret.message,
      });
    }
  } catch (e) {
    return res.status(404).send({
      status: "error",
      data: null,
      message: e.message,
    });
  }
};
// Delete task
exports.deleteTask = async (req, res) => {
  const token = req.headers["x-access-token"];
  let id = req.params.id;
  // console.log(`Task ID - ${id}`);
  let ret = await verifyToken(token);
  //console.log(`Returned Token check - ${JSON.stringify(ret)}`);
  try {
    if (ret.data.auth === "active") {
      let result = await Task.remove(id);
      console.log(`deleted - ${JSON.stringify(result)}`);
      return res.status(ret.status).send({
        status: "success",
        data: result,
        message: "Task deleted successfully",
      });
    } else {
      return res.status(ret.status).send({
        status: "success",
        data: ret.data,
        message: ret.message,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({
      status: "error",
      data: null,
      message: e.message,
    });
  }
};
