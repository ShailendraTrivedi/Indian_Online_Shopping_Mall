import React, { useState } from "react";
import { XSquare } from "lucide-react";
import { Formik, Form } from "formik";
import CARD from "./CARD";
import UPI from "./UPI";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addOrderAction } from "../../../redux/slices/orderSlices/orderAction";
import Loading from "../../../helper/Loading";

const Model = ({ handlePopUp, data, total }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.orderStore.loading);
  const [cardOrUPI, setCardOrUPI] = useState(true);

  const formatPrice = (amount) => {
    return `Rs ${amount.toLocaleString("en-IN")}`;
  };

  const initialValues = {
    country: "",
    cardname: "",
    cardnumber: "",
    cvv: "",
    expiry: "",
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    cardname: Yup.string().required("Card Holder Name is required"),
    cardnumber: Yup.string()
      .required("Card Number is required")
      .matches(/^\d{16}$/, "Card Number must be 16 digits"),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be 3 digits"),
    expiry: Yup.string()
      .required("Expiry Date is required")
      .matches(/^\d{2}\/\d{2}$/, "Expiry Date must be in the format MM/YY"),
  });

  const onSubmit = (values) => {
    dispatch(addOrderAction(values));
    setTimeout(() => {
      handlePopUp();
    }, 2000);
  };

  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0  bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="flex justify-center items-center w-full h-full">
            <div className="relative flex flex-col justify-between sm:w-[50%] w-full m-2 bg-white gap-4 py-10 rounded">
              <XSquare
                onClick={handlePopUp}
                size={34}
                className="absolute top-0 right-0"
              />
              <div className="text-3xl text-center bg-white">
                Payment Details
              </div>
              <div className="flex justify-between w-full border-b-2">
                <div
                  onClick={() => setCardOrUPI(true)}
                  className={`${
                    cardOrUPI ? "bg-green-700 text-white" : ""
                  } text-center w-full p-2`}
                >
                  Cards
                </div>
                <div
                  className={`${
                    !cardOrUPI ? "bg-green-700 text-white" : ""
                  } text-center w-full p-2`}
                >
                  UPI
                </div>
              </div>
              {loading ? (
                <div className="flex w-full h-full justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {() => (
                    <Form>
                      <div className="w-full h-full p-2">
                        {cardOrUPI ? <CARD /> : <UPI />}
                      </div>
                      <div className="flex sm:flex-row flex-col gap-10 sm:justify-around justify-center items-center w-full p-2">
                        <div className="flex gap-2 text-xl">
                          Total Amount:
                          <div className="font-bold">{formatPrice(total)}</div>
                        </div>

                        <button
                          type="submit"
                          className="bg-green-700 p-2 w-[10rem] rounded text-white text-center cursor-pointer"
                        >
                          Place Order
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
