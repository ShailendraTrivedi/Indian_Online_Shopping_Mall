const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const { TEMP_EMAIL, TEMP_PASSWORD } = require("../../constant.js");
const UserModel = require("../../models/UserModel.js");

/** POST :  http://localhost:5000/otp/verifyEmail */
const handleValidEmail = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await UserModel.findOne({ userEmail: userEmail });
    if (user) {
      const OTP = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      // Some problem here for other systems
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        // secure: true,
        auth: {
          user: TEMP_EMAIL,
          pass: TEMP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const message = {
        from: "dishdiscovery.connect@gmail.com",
        to: userEmail,
        subject: "Verification Code",
        text: `Your OTP: ${OTP}`,
      };

      await transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Something went wrong with email sending." });
        }

        req.app.locals.userEmail = userEmail;
        req.app.locals.OTP = OTP;
        req.app.locals.otpExpiry = Date.now() + 5 * 60 * 1000;

        return res.status(200).send({ message: "OTP send Successfully" });
      });
    } else {
      res.status(400).send({ error: "Email is not valid." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
};

module.exports = handleValidEmail;
