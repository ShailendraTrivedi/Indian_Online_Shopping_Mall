import {
  fetchOrderRequest,
  fetchOrderSuccess,
  fetchOrderFailure,
  addOrderRequest,
  addOrderSuccess,
  addOrderFailure,
} from "./orderReducer";
import { clearCart } from "../cartSlices/cartReducer";
import { toast } from "react-toastify";
import { REACT_APP_SERVER } from "../../../constant";
import api from "../../../InterceptorAPI";

export const addOrderAction = (values) => {
  return async (dispatch) => {
    dispatch(addOrderRequest());
    try {
      const response = await api.post(
        `${REACT_APP_SERVER}/order/addOrder`,
        values
      );
      setTimeout(() => {
        if (response.status === 200) {
          toast.success("Order Placed");
          dispatch(addOrderSuccess());
          dispatch(clearCart());
        }
      }, 2000);
    } catch (error) {
      dispatch(addOrderFailure());
      toast.error("Internal server error");
    }
  };
};

export const fetchOrderAction = () => {
  return async (dispatch) => {
    dispatch(fetchOrderRequest());
    try {
      const response = await api.get(`${REACT_APP_SERVER}/order/fetchOrder`, {
        
      });
      dispatch(fetchOrderSuccess(response.data));
    } catch (error) {
      dispatch(fetchOrderFailure());
    }
  };
};
