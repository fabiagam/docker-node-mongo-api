/***************************************
 * Task Model
 * @file: models/Task.js
 * @author: James N. Abiagam
 ****************************************/
"use  strict";
const mongoose = require("mongoose");
let Schema = mongoose.Schema; //Define a schema
Promise = require("bluebird");
mongoose.Promise = Promise;
const date = require("../lib/DateHelper");

const TaskSchema = new Schema({
  title: String,
  description: String,
  code: String,
  user_id: String,
  date_added: String,
  date_timestamp: Number,
});

TaskSchema.statics.add = async (data) => {
  let { title, description, code, userid } = data;
  let taskObj = {};
  taskObj.title = title;
  taskObj.code = code;
  taskObj.user_id = userid;
  taskObj.description = description;
  taskObj.date_added = date.setCoreDate(date.getCurrentTimestamp());
  taskObj.date_timestamp = date.getCurrentTimestamp();

  let taskData = new Task(taskObj);
  return taskData
    .save()
    .then((d) => {
      return d;
    })
    .catch((e) => {
      console.log(e);
      return new Error(e.message);
    });
};

TaskSchema.statics.getAllByUserId = (uid) => {
  return new Promise((resolve, reject) => {
    let where = { user_id: uid };
    Task.find(where)
      .sort({ date_timestamp: "descending" })
      .then((p) => {
        return resolve(p);
      })
      .catch((e) => {
        return reject(new Error(e.message));
      });
  });
};

TaskSchema.statics.getOne = (uid) => {
  return new Promise((resolve, reject) => {
    let where = { _id: uid };
    User.findOne(where)
      .then((p) => {
        return resolve(p);
      })
      .catch((e) => {
        return reject(new Error(e.message));
      });
  });
};

TaskSchema.statics.updateRecord = (docId, update) => {
  return new Promise((resolve, reject) => {
    Task.findByIdAndUpdate(docId, update, { new: true })
      .then((doc) => {
        return resolve(doc);
      })
      .catch((err) => {
        return reject(new Error(err.message));
      });
  });
};

TaskSchema.statics.remove = (docId) => {
  return new Promise((resolve, reject) => {
    Task.findByIdAndRemove(docId, {}, function (err, doc) {
      if (err) return reject(new Error(err.message));
      return resolve(doc);
    });
  });
};

let Task = mongoose.model("tasks", TaskSchema);
module.exports = Task;
