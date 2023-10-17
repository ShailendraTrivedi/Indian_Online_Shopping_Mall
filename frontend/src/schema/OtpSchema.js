import * as Yup from "yup";

export const emailSchema = Yup.object({
  userEmail: Yup.string().email().required("*Please enter the Email"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().max(6).min(6).required("*Please enter the 6-digit OTP"),
});

export const passwordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Please enter the password!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("*Please re-enter the password")
    .oneOf([Yup.ref("password"), null], "*Password must match"),
});
