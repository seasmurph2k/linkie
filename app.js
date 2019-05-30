const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const linkShortner = require("./routes/shortner");
const linkExpander = require("./routes/expander");
const dashboardRouter = require("./routes/dashboard");

const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

const store = new mongoDBStore({
  uri: "mongodb://localhost:27017/Linkie",
  collection: "linkieSessions"
});

const db = require("./config/db.js");
const User = require("./models/User");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "lknlklkamlkasd",
    store: store,
    cookie: {
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    name: "session",
    resave: true,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/shortner", linkShortner);
app.use("/x", linkExpander);
app.use("/dashboard", dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
