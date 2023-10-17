const otpVariables = (req, res, next) => {
  req.app.locals = {
    userEmail: null,
    OTP: null,
    resetSession: false,
    otpExpiry: null,
  };
  next();
};

module.exports = { otpVariables};
