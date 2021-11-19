import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./input.scss";

const Input = ({ placeholder, name, type, error, ...props }) => {
  return (
    <input
      className={classNames("input", {
        input__error: error,
      })}
      type={type}
      placeholder={placeholder}
      name={name}
      {...props}
    ></input>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: "",
  value: "",
  name: "",
  type: "text",
  error: false,
};

export default Input;
