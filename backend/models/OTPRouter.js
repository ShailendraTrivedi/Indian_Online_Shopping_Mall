const { Router } = require("express");
const handleValidEmail = require("../controllers/optController/handleValidEmail");
const handleVerifyOTP = require("../controllers/optController/handleVerifyOTP");
const handleUpdatePassword = require("../controllers/optController/handleUpdatePassword");
const { otpVariables } = require("../middlewares/localVariable");

const OTPRouter = Router();

OTPRouter.post("/verifyEmail", otpVariables, handleValidEmail);
OTPRouter.post("/verifyOTP", handleVerifyOTP);
OTPRouter.post("/updatePassword", handleUpdatePassword);

module.exports = OTPRouter;
