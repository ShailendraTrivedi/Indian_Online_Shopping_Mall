const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constant");

const setUser = (user) => {
  const payload = {
    userId: user._id,
    userEmail: user.userEmail,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

const getUser = (token) => {
  if (!token) return null;
  const decode = jwt.verify(token, SECRET_KEY);
  return decode;
};

module.exports = {
  setUser,
  getUser,
};
