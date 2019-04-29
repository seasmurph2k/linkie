const express = require("express");
const router = express.Router();
const Links = require("../models/Links");

router.get("/", isAuthed, async (req, res) => {
  let myLinks = await Links.find({ owner: req.user._id });
  myLinks.sort((a, b) => {
    return b.views - a.views;
  });
  res.render("dashboard", {
    myLinks
  });
});
router.get("/mylinks", isAuthed, async (req, res) => {
  let mylinks = await Links.find({ owner: req.user._id });

  res.render("mylinks", {
    links: mylinks
  });
});

//make utils
function isAuthed(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect("/login");
}
module.exports = router;
