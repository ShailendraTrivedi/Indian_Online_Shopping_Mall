const UserModel = require("../../models/UserModel");

/** GET : http://localhost:5000/user/fetchUser */
const handleFetchUser = async (req, res) => {
  try {
    const { userId } = req.details;
    const user = await UserModel.findById(userId, {
      userImg: true,
      userName: true,
      userPhoneNumber: true,
      userEmail: true,
      userAddress: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error: Unable to fetch user" });
  }
};

module.exports = handleFetchUser;
