const bcrypt = require("bcrypt");
const UserModel = require("../../models/UserModel");

/** POST :   http://localhost:5000/otp/updatePassword */

const handleUpdatePassword = async (req, res) => {
  try {
    const userPassword = req.body.userPassword;
    if (!req.app.locals.userEmail || !req.app.locals.resetSession) {
      return res.status(409).send({ error: "Email not verified :(" });
    }

    const userEmail = req.app.locals.userEmail;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const updatedUser = await UserModel.findOneAndUpdate(
      { userEmail: userEmail },
      { userPassword: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    req.app.locals.resetSession = false;

    return res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

module.exports = handleUpdatePassword;
