const express = require("express");
const router = express.Router();
const passport = require("passport");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/dashboard",
  (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login");
  },
  (req, res) => {
    res.render("dashboard");
  }
);

module.exports = router;
