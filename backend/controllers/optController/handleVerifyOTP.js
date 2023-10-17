/** POST :  http://localhost:5000/otp/verifyOTP */

const handleVerifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const currentTime = Date.now();
    if (currentTime > req.app.locals.otpExpiry) {
      res.status(401).send({ error: "OTP expired." });
      return;
    }

    if (!req.app.locals.OTP) {
      res.status(409).send({ error: "OTP not generated." });
      return;
    }

    if (parseInt(req.app.locals.OTP) === parseInt(otp)) {
      req.app.locals.resetSession = true;
      req.app.locals.OTP = null;

      res.status(200).send({ message: "Valid OTP :)" });
    } else {
      res.status(400).send({ error: "Invalid OTP." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
};

module.exports = handleVerifyOTP;
