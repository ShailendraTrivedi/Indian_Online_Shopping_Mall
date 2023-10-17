import { toast } from "react-toastify";
import {
  addToCartFailure,
  addToCartRequest,
  addToCartSuccess,
  decrementCartFailure,
  decrementCartRequest,
  decrementCartSuccess,
  deleteCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  fetchCartFailure,
  fetchCartRequest,
  fetchCartSuccess,
  incrementCartFailure,
  incrementCartRequest,
  incrementCartSuccess,
} from "./cartReducer";
import { REACT_APP_SERVER } from "../../../constant";
import api from "../../../InterceptorAPI";

const fetchCartAction = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCartRequest());
      const response = await api.get(`${REACT_APP_SERVER}/cart/allCartItem`);
      if (response.status === 200) {
        dispatch(fetchCartSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchCartFailure());
    }
  };
};

const addCartAction = (values) => {
  return async (dispatch) => {
    try {
      dispatch(addToCartRequest());
      const response = await api.post(
        `${REACT_APP_SERVER}/cart/addToCart`,
        values
      );
      if (response.status === 201) {
        dispatch(addToCartSuccess(values));
        toast.success("Item Added into Cart");
      }
    } catch (error) {
      dispatch(addToCartFailure());
      if (error.response && error.response.status === 530) {
        toast.error("Login Please");
      } else if (error.response && error.response.status === 409) {
        toast.warning("Product Already Present.");
      } else {
        toast.error("Internal Server Error");
      }
    }
  };
};

const deleteCartAction = (values) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCartRequest());
      const response = await api.delete(
        `${REACT_APP_SERVER}/cart/deleteProduct`,
        {
          data: values,
        }
      );
      if (response.status === 200) {
        dispatch(deleteCartSuccess(values));
        toast.success("Product deleted from the cart successfully.");
      }
    } catch (error) {
      dispatch(deleteCartFailure());
      toast.error("Internal Server Error");
    }
  };
};

const incrementAction = (values) => {
  return async (dispatch) => {
    dispatch(incrementCartRequest());
    try {
      const response = await api.patch(
        `${REACT_APP_SERVER}/cart/incrementCartItem`,
        values
      );
      if (response.status === 200) {
        dispatch(incrementCartSuccess(values));
      }
    } catch (error) {
      dispatch(incrementCartFailure());
      toast.error("Internal Server Error");
    }
  };
};

const decrementAction = (values) => {
  return async (dispatch) => {
    dispatch(decrementCartRequest());
    try {
      const response = await api.patch(
        `${REACT_APP_SERVER}/cart/decrementCartItem`,
        values
      );
      if (response.status === 200) {
        dispatch(decrementCartSuccess(values));
      }
    } catch (error) {
      dispatch(decrementCartFailure());
      toast.error("Internal Server Error");
    }
  };
};

export {
  fetchCartAction,
  addCartAction,
  deleteCartAction,
  incrementAction,
  decrementAction,
};
