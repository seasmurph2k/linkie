const express = require("express");
const router = express.Router();
const Links = require("../models/Links");

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
