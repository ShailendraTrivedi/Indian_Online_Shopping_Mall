import * as Yup from "yup";

export const signInSchema = Yup.object({
  userEmail: Yup.string()
    .email("Please enter a valid Email")
    .test("is-gmail", "Email must be a Gmail address", (value) => {
      return value.endsWith("@gmail.com");
    })
    .required("Please enter your Email!"),

  userPassword: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Please enter the password!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

export const signUpSchema = Yup.object({
  userName: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .max(20, "Username should not exceed 15 characters")
    .required("Please enter your Username!"),

  userEmail: Yup.string()
    .email("Please enter a valid Email")
    .test("is-gmail", "Email must be a Gmail address", (value) => {
      return value.endsWith("@gmail.com");
    })
    .required("Please enter your Email!"),

  userPhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number should only contain digits")
    .min(10, "Phone number should have at least 10 digits")
    .max(15, "Phone number should not exceed 15 digits"),

  userPassword: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Please enter the password!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), null], "Password must match")
    .required("Please enter the confirm password!"),
});
