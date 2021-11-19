import React from "react";
import PropTypes from "prop-types";
import "./alert.scss";

const Alert = ({ children, ...props }) => {
  return (
    <div className="alert" {...props}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
};

Alert.defaultProps = {};

export default Alert;
