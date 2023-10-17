import axios from "axios";
import { fetchFailure, fetchRequest, fetchSuccess } from "./productReducer";
import { REACT_APP_SERVER } from "../../../constant";

const fetchProductAction = (category) => {
  return async (dispatch) => {
    try {
      dispatch(fetchRequest());
      const response = await axios.post(
        `${REACT_APP_SERVER}/product/allProducts`,
        category
      );
      if (response.status === 200) {
        dispatch(fetchSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchFailure());
    }
  };
};

export { fetchProductAction };
