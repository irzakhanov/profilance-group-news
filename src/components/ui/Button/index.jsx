import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./button.scss";

function Button({ children, onClick, primary, danger }) {
  return (
    <button
      className={classNames("default", {
        primary: primary,
        danger: danger,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  danger: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  danger: false,
  arrow: false,
};

export default Button;
