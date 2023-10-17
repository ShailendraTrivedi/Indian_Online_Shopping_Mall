const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const UserModel = require("../modals/UserSchema.js");
const { TEMP_EMAIL, TEMP_PASSWORD } = require("../constant.js");

/** POST: http://localhost:5000/foodieuser/validEmail */
const validEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });

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
        to: email,
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

        req.app.locals.email = email;
        req.app.locals.OTP = OTP;
        req.app.locals.otpExpiry = Date.now() + 5 * 60 * 1000;

        return res.status(200).send({
          msg: "You should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
      });
    } else {
      res.status(400).send({ error: "Email is not valid."});
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
};

/** POST: http://localhost:5000/foodieuser/verifyOTP */
const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const currentTime = Date.now();
    if (currentTime > req.app.locals.otpExpiry) {
      res.status(409).send({ error: "OTP expired." });
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
      res.status(401).send({ error: "Invalid OTP." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
};

/** POST: http://localhost:5000/foodieuser/updatePassword */
const updatePassword = async (req, res) => {
  try {
    const password = req.body.password;

    if (!req.app.locals.email || !req.app.locals.resetSession) {
      return res.status(409).send({ error: "Email not verified :(" });
    }

    const email = req.app.locals.email;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    req.app.locals.resetSession = false;

    return res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send({ error: "Internal server error." });
  }
};
module.exports = {
  validEmail,
  verifyOTP,
  updatePassword,
};
