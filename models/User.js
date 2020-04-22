/***************************************
 * User Model
 * @file: models/User.js
 * @author: James N. Abiagam
 ****************************************/
"use  strict";
const mongoose = require("mongoose");
let Schema = mongoose.Schema; //Define a schema
Promise = require("bluebird");
mongoose.Promise = Promise;
const { hashPassword } = require("../lib/Helpers");
const date = require("../lib/DateHelper");

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  last_login: String,
  signup_date: String,
});

UserSchema.statics.saveProfile = async (odata) => {
  let { firstname, lastname, email, password } = odata;
  let userObj = {};
  userObj.firstname = firstname;
  userObj.lastname = lastname;
  userObj.email = email;
  userObj.password = hashPassword(password);
  userObj.last_login = null;
  userObj.signup_date = date.setCoreDate(date.getCurrentTimestamp());

  let userData = new User(userObj);
  return userData
    .save()
    .then((d) => {
      return d;
    })
    .catch((e) => {
      console.log(e);
      return new Error(e.message);
    });
};

UserSchema.statics.checkProfile = (person) => {
  return new Promise((resolve, reject) => {
    let where = { email: person.email };
    let fields = {
      email: 1,
      firstname: 1,
      lastname: 1,
      last_login: 1,
      password: 1,
    };
    User.findOne(where)
      .select(fields)
      .then((p) => {
        return resolve(p);
      })
      .catch((e) => {
        return reject(new Error(e.message));
      });
  });
};

UserSchema.statics.getProfile = (uid) => {
  return new Promise((resolve, reject) => {
    let where = { _id: uid };
    let fields = {
      email: 1,
      firstname: 1,
      _id: 1,
      password: 0,
      lastname: 1,
      last_login: 1,
      signup_date: 0,
    };
    User.findOne(where)
      .select(fields)
      .then((p) => {
        return resolve(p);
      })
      .catch((e) => {
        return reject(new Error(e.message));
      });
  });
};

UserSchema.statics.getUserById = (oid) => {
  return new Promise((resolve, reject) => {
    let fields = {
      email: 1,
      firstname: 1,
      _id: 1,
      password: 0,
      lastname: 1,
      last_login: 1,
      signup_date: 0,
    };
    User.findById(oid, fields)
      .then((p) => {
        return resolve(p);
      })
      .catch((e) => {
        return reject(new Error(e.message));
      });
  });
};

UserSchema.statics.updateProfile = (docId, update) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(docId, update, { new: true })
      .then((doc) => {
        return resolve(doc);
      })
      .catch((err) => {
        return reject(new Error(err.message));
      });
  });
};

UserSchema.statics.updateLastLogin = (docId) => {
  return new Promise((resolve, reject) => {
    let newDate = date.setCoreDate(date.getCurrentTimestamp());
    let update = { last_login: newDate };
    Customer.findByIdAndUpdate(docId, update, { new: true })
      .then((doc) => {
        return resolve(doc);
      })
      .catch((err) => {
        return reject(new Error(err.message));
      });
  });
};

let User = mongoose.model("users", UserSchema);
module.exports = User;
