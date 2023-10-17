const UserModel = require("../models/UserModel");
const { getUser } = require("./tokenAuth");

const checkAuth = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send({ Authorization: "Token Not Get" });
    }
    const { userId, userEmail } = getUser(token);
    const existUserId = await UserModel.findById(userId);
    if (existUserId.userEmail === userEmail) {
      req.details = { userId, productId };
      next();
    }
  } catch (error) {
    return res.status(530).send({ Authorization: "Unauthorized User" });
  }
};

module.exports = checkAuth;
