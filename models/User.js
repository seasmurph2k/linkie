const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  signedup: { type: Date, required: true, default: Date.now }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
