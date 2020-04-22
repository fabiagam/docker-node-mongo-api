/*************************************************
 * Data Validation Scheme
 *************************************************/
"use  strict";
const Joi = require("@hapi/joi");

const validateUser = (user) => {
  let obj = setValidObjects(user);
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(obj);
};

const setValidObjects = (odata) => {
  let obj = {};
  obj.firstname = odata.firstname;
  obj.lastname = odata.lastname;
  obj.email = odata.email;
  obj.password = odata.password;
  return obj;
};

module.exports = { validateUser };
