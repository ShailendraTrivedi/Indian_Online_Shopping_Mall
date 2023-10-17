import React from "react";
import { Field, ErrorMessage } from "formik";

const CARD = () => {
  return (
    <>
      <div className="flex flex-col gap-2 mx-auto w-[80%] text-sm">
        <div>
          <label htmlFor="country">Select Card Type:</label>
          <Field
            as="select"
            name="country"
            className="w-full p-2 px-4 bg-white text-lg border-2 border-black focus:outline-none"
          >
            <option value="">Choose a country</option>
            <option value="IND">India</option>
            <option value="US">United States</option>
            <option value="RU">Russia</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </Field>
          <ErrorMessage
            name="country"
            component="div"
            className="text-red-500"
          />
        </div>
        <div>
          <label htmlFor="cardname">Card Holder Name:</label>
          <Field
            type="text"
            name="cardname"
            className="w-full p-2 px-4 bg-white border-2 border-black focus:outline-none"
          />
          <ErrorMessage
            name="cardname"
            component="div"
            className="text-red-500"
          />
        </div>
        <div>
          <label htmlFor="cardnumber">Card Number:</label>
          <Field
            type="text"
            name="cardnumber"
            className="w-full p-2 px-4 bg-white border-2 border-black focus:outline-none"
          />
          <ErrorMessage
            name="cardnumber"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="flex justify-between sm:gap-10 gap-5">
          <div>
            <label htmlFor="cvv">CVV Number:</label>
            <Field
              type="text"
              name="cvv"
              className="w-full p-2 px-4 bg-white border-2 border-black focus:outline-none"
            />
            <ErrorMessage name="cvv" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="expiry">Expiry Date:</label>
            <Field
              type="text"
              name="expiry"
              className="w-full p-2 px-4 bg-white border-2 border-black focus:outline-none"
            />
            <ErrorMessage
              name="expiry"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CARD;
