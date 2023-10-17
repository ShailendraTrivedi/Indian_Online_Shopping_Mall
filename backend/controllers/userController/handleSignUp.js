const UserModel = require("../../models/UserModel");

/** POST :  http://localhost:5000/user/signUp */
const handleSignUp = async (req, res) => {
  try {
    const {
      userName,
      userPhoneNumber,
      userEmail,
      userPassword,
      userAddress,
      userImg,
    } = req.body;

    if (!userName || !userPhoneNumber || !userEmail || !userPassword) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ userPhoneNumber }, { userEmail }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Phone Number or Email already exists" });
    }

    const newUser = new UserModel({
      userName,
      userPhoneNumber,
      userEmail,
      userPassword,
      userAddress,
      userImg,
    });

    const result = await newUser.save();
    newUser.userPassword = undefined;

    
    return res
      .status(201)
      .json({ message: "User Registered Successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server Error: User Registration Unsuccessful" });
  }
};

module.exports = handleSignUp;
