import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./login.styles.css";

/** Validation */
import { Form, Formik } from "formik";
import { signInSchema } from "../../schema/AuthSchema";
import Input from "../../helper/Input";
import { signInAction } from "../../redux/slices/userSlices/userAction";
import Loading from "../../helper/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.userStore.loading);

  const initialValues = {
    userEmail: "",
    userPassword: "",
  };

  const handleSubmit = (values) => {
    dispatch(signInAction(values, navigate));
  };

  return (
    <>
      <div className="flex min-h-screen gap-10 flex-col items-center px-6 py-12 lg:px-8 loginBG">
        {loading ? (
          <Loading />
        ) : (
          <>
            <img
              className="mx-auto h-24 w-auto"
              src="/IMG/LOGO_copy.png"
              alt="Your Company"
            />
            <div className=" flex flex-col gap-5 w-[25rem] px-10 bg-white p-5 rounded-2xl">
              <h2 className="text-center text-2xl font-bold p-5">
                Signin into your account
              </h2> 
              <Formik
                initialValues={initialValues}
                validationSchema={signInSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div className="flex flex-col gap-5">
                      <Input type="text" name="userEmail" label="Email" />
                      <Input
                        type="password"
                        name="userPassword"
                        label="Password"
                      />
                      <div className="flex justify-end">
                        <Link to="/verifyEmail" className="text-sm">
                          Forget Password ?
                        </Link>
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-2 w-[10rem] text-white rounded-3xl"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              <p className=" text-center text-sm text-gray-500">
                Not a member?
                <Link to="/signup" className="text-green-700 font-bold">
                  Register
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
