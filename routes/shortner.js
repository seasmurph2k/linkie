const express = require("express");
const router = express.Router();
const Link = require("../models/Links");
const randomString = require("randomstring");
const Validator = require("validator");
router.post(
  "/",
  (req, res, next) => {
    Validator.isURL(req.body.link)
      ? next()
      : res.status(400).json({ msg: "Must be a valid url" });
  },
  async (req, res) => {
    let owner, premium;
    if (req.user) {
      owner = req.user._id;
      premium = req.user.premium;
    } else {
      owner = "Anon";
      premium = false;
    }
    const { link } = req.body;
    const shortCode = randomString.generate(4);
    let newLink = new Link({
      owner,
      shortCode,
      premium,
      realLink: link
    });
    await newLink.save();
    res.status(200).json({ link: shortCode });
  }
);

module.exports = router;
