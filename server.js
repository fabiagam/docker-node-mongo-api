// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session"); 
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const db = require("./config/database");
const routes = require("./config/routes");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const sessAge = Number(180 * 60 * 1000);
let sessionOptions = {
  secret: process.env.SECRET,
  cookie: { maxAge: sessAge },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 24 * 60 * 60 * 14,
    autoRemove: "interval",
    autoRemoveInterval: 10,
  }),
};
app.use(session(sessionOptions));

app.use(helmet());
app.use(compression());

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT);
console.log("MERN Task Manager Launched to listen on port " + PORT);
module.exports = app;
