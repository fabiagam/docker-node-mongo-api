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
    mongoose.connect(process.env.PROD_DATABASE_HOST, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    break;
  case "development":
    mongoose.connect(process.env.DEV_DATABASE_HOST, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    break;
  case "test":
    mongoose.connect(process.env.TEST_DATABASE_HOST, {
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
