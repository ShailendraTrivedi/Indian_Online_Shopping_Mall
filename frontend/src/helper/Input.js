import React from "react";
import "./helper.css";
import { ErrorMessage, Field } from "formik";
const Input = ({ type, disabled, name, label, as }) => {
  return (
    <div className="relative">
      <Field
        id={name}
        as={as}
        disabled={disabled}
        type={type}
        name={name}
        className="inputfield_css peer"
        required="required"
        autoComplete="off"
      />
      <label htmlFor={name} className="labelfeild_css">
        {label}
      </label>
      <div className="text-red-700 text-[12px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Input;
