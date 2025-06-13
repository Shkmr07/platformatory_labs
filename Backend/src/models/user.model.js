const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    phoneNumber: { type: String },
    pincode: { type: String },
    email: String,
    profileImg : String,
    city : String,
    pincode : Number,

});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
