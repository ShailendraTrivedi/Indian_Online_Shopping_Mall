const { setUser } = require("../../middlewares/tokenAuth");
const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const cookie = require("cookie");

/** POST : http://localhost:5000/user/signIn */
const handleSignIn = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res.status(400).send("User Details not provided");
    }
    const existUserEmail = await UserModel.findOne({ userEmail: userEmail });
    if (!existUserEmail) return res.status(404).send("User Not Found");

    const isPasswordValid = bcrypt.compareSync(
      userPassword,
      existUserEmail.userPassword
    );

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }
    const token = setUser(existUserEmail);
    return res.status(200).send({
      message: "Login Successfully",
      userDetails: {
        token: token,
        email: userEmail,
      },
    });
  } catch (error) {
    return res.status(500).send("Server Error: User Login Unsuccessful");
  }
};

module.exports = handleSignIn;
