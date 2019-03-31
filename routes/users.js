const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const validateRegistrationData = require("../validation/register");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  }),
  async (req, res) => {}
);

router.post(
  "/register",
  (req, res, next) => {
    const { errors, isValid } = validateRegistrationData(req.body);
    if (!isValid) {
      return res.status(400).render("register", {
        errors
      });
    }
    next();
  },
  async (req, res) => {
    try {
      const { username, email, password } = req.body;

      let newUser = new User({
        username,
        email
      });

      await newUser.setPassword(password);
      await newUser.save();

      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/logout", async (req, res) => {});
router.post("/requestreset", async (req, res) => {});

module.exports = router;
