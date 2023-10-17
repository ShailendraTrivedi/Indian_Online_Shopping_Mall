const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");

/** PATCH : http://localhost:5000/user/updateUser */
const handleUpdateUser = async (req, res) => {
  try {
    const { userId } = req.details;
    const updates = req.body;

    if (updates.userPassword) {
      const salt = await bcrypt.genSalt(10);
      updates.userPassword = await bcrypt.hash(updates.userPassword, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error: Unable to update user" });
  }
};

module.exports = handleUpdateUser;
