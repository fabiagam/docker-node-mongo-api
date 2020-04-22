"use strict";

const TaskController = require("../controllers/TaskManager");
const UsersController = require("../controllers/Users");

module.exports = function (app) {
  // API Controller Routes
  app.post("/users/create", UsersController.register);
  app.post("/users/login", UsersController.signin);
  app.get("/user/me", UsersController.show);
  app.get("/task/dashboard", TaskController.dashboard);
  app.get("/task/edit/:id", TaskController.editTask);
  app.put("/task/update/:id", TaskController.updateTask);
  app.delete("/task/delete/:id", TaskController.deleteTask);
};
