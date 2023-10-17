import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../index.css";

/** Validation */
import "./signup.styles.css";
import { Form, Formik } from "formik";

/** Redux */
import Input from "../../helper/Input";
import { signUpAction } from "../../redux/slices/userSlices/userAction";
import Loading from "../../helper/Loading";
import { signUpSchema } from "../../schema/AuthSchema";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.userStore.loading);

  const onSubmit = (values) => {
    dispatch(signUpAction(values, navigate));
  };

  return (
    <>
      <div className="loginBG min-h-screen flex flex-col items-center pt-10 p-4">
        {loading ? (
          <Loading />
        ) : (
          <div className="xl:w-[40%] md:w-[60%] w-full">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">
                Start a journey with us.
              </h1>
              <Formik
                initialValues={{
                  userName: "",
                  userEmail: "",
                  userPhoneNumber: "",
                  userPassword: "",
                  confirmpassword: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <div className="flex flex-col gap-5">
                      <Input type="text" name="userName" label="Full Name" />
                      <Input
                        type="text"
                        name="userPhoneNumber"
                        label="Phone Number"
                      />
                      <Input type="text" name="userEmail" label="Email" />
                      <Input
                        id="userPassword"
                        type="password"
                        name="userPassword"
                        label="Password"
                      />
                      <Input
                        id="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        label="Confirm Password"
                      />
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-2 w-[10rem] text-white rounded-3xl"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="flex gap-2 justify-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <span className="font-bold text-red-700">Terms of Service</span>
                and
                <span className="font-bold text-red-700">Privacy Policy</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
