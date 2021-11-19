import React from "react";
import PropTypes from "prop-types";
import "./modal.scss";

const Modal = ({ children, setVisible }) => {
  return (
    <div className="modal" onClick={() => setVisible(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  setVisible: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
