const express = require("express");
const router = express.Router();
const passport = require("passport");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    isAuthed: req.isAuthenticated()
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    isAuthed: req.isAuthenticated()
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    isAuthed: req.isAuthenticated()
  });
});
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
