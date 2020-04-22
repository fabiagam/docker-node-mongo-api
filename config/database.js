/***
 * Database Connector
 * @file: config/database.js
 * @author: James Abiagam
 */
"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
console.log("Environment :" + process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case "production":
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    break;
  case "development":
    mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    break;
}

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => {
  console.log("MERN Task Manager DB connection is now open!");
});

module.exports = db;
