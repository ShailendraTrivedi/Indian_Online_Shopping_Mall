const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required in userSchema"],
  },
  userPhoneNumber: {
    type: String,
    required: [true, "User phone number is required in userSchema"],
  },
  userEmail: {
    type: String,
    required: [true, "User Email is required in userSchema"],
  },
  userPassword: {
    type: String,
    required: [true, "User password is required in userSchema"],
  },
  userAddress: {
    type: String,
  },
  userImg: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.userPassword, salt);

    this.userPassword = hashedPassword;
    next();
  } catch (error) {
    return next(error); // Call next with the error object
  }
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
