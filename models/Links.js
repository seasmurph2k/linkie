const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  owner: { type: String },
  shortCode: { type: String, required: true, unique: true },
  realLink: { type: String, required: true },
  views: { type: Number, default: 0 },
  premium: { type: Boolean, default: false },
  dateAdded: { type: Date, required: true, default: Date.now },
  campaign: { type: String }
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
