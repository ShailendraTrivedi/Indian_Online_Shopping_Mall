import axios from "axios";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  signInFailure,
  signInRequest,
  signInSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "./userReducer";
import { toast } from "react-toastify";
import { REACT_APP_SERVER } from "../../../constant";
import api from "../../../InterceptorAPI";

const signInAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(signInRequest());
      const response = await axios.post(
        `${REACT_APP_SERVER}/user/signIn`,
        values
      );
      if (response.status === 200) {
        const token = response.data.userDetails.token;
        dispatch(signInSuccess(token));
        document.cookie = `token=${token}`;
        toast.success("Login Successfully");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      dispatch(signInFailure());
      if (error.response && error.response.status === 401) {
        toast.error("Invalid password");
      } else if (error.response && error.response.status === 404) {
        toast.error("User Not Found");
      } else {
        toast.error("Internal server error");
      }
    }
  };
};

const signUpAction = (values, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(signUpRequest());
      const response = await axios.post(
        `${REACT_APP_SERVER}/user/signUp`,
        values
      );
      setTimeout(() => {
        if (response.status === 201) {
          dispatch(signUpSuccess());
          toast.success("Registration Successfully");
          navigate("/signIn");
        }
      }, 2000);
    } catch (error) {
      dispatch(signUpFailure());
      if (error.response && error.response.status === 409) {
        toast.error("Phone Number or Email already exists");
      } else {
        toast.error("Internal server error");
      }
    }
  };
};

const fetchUserAction = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await api.get(`${REACT_APP_SERVER}/user/fetchUser`);
      if (response.status === 200) {
        dispatch(fetchUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchUserFailure());
    }
  };
};

const updateUserAction = (values) => {
  return async () => {
    try {
      const response = await api.patch(
        `${REACT_APP_SERVER}/user/updateUser`,
        values
      );
      if (response.status === 200) {
        toast.success("Update User Successfully");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };
};

export { signInAction, signUpAction, fetchUserAction, updateUserAction };
