const express = require("express");
const router = express.Router();
const Link = require("../models/Links");

router.get("/:shortCode", async (req, res) => {
  //do some validation/sanitization before passing to db
  let shortCode = req.params.shortCode;

  const linkRequest = await Link.findOne({ shortCode });
  linkRequest.views += 1;
  await linkRequest.save();
  let data = {
    referer: req.headers.referer,
    userAgent: req.headers["user-agent"],
    ip: req.ip
  };
  if (!linkRequest.premium) {
    return res.render("freemiumIntersitial", { link: linkRequest.realLink });
  }
  if (linkRequest.premium) {
    return res.render("intersitial", { link: linkRequest.realLink });
  }
});

module.exports = router;
