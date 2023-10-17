import { Form, Formik } from "formik";
import Input from "../../helper/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_SERVER } from "../../constant";
import { passwordSchema } from "../../schema/OtpSchema";

// SignUp.jsx
const UpdatePassword = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/otp/updatePassword`,
        values
      );
      if (response.status === 200) {
        navigate("/");
        toast.success("Password updated successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.warning("Email not verified");
      } else {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen loginBG flex flex-col justify-center items-center">
        <div className=" flex flex-col gap-5 m-2 sm:w-[35rem] px-10 bg-white p-5 rounded-2xl">
          <h2 className="text-center text-sm font-bold sm:p-5 p-3 sm:px-10">
            Please enter your new password below to reset it.
          </h2>
          <Formik
            initialValues={{ userPassword: "", confirmPassword: "" }}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="flex flex-col gap-5">
                  <Input type="password" name="userPassword" label="Password" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                  />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-2 w-[10rem] text-white rounded-3xl"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
