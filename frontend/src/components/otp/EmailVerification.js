import { Form, Formik } from "formik";
import Input from "../../helper/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_SERVER } from "../../constant";
import { emailSchema } from "../../schema/OtpSchema";

// SignUp.jsx
const EmailVerification = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/otp/verifyEmail`,
        values
      );
      if (response.status === 200) {
        navigate("/verifyOTP");
        toast.success("OTP send Successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning("Email is not valid");
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
            Please enter your registered email address, and we'll send you OTP.
          </h2>
          <Formik
            initialValues={{ userEmail: "" }}
            validationSchema={emailSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="flex flex-col gap-5">
                  <Input type="text" name="userEmail" label="Email" />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-2 w-[10rem] text-white rounded-3xl"
                    >
                      Send OTP
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

export default EmailVerification;
