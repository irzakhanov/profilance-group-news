import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/ui/Button";

function NewsOne({ id, title, text, date, admin, approved, onDelete, onApproved }) {
  const adminPanel = () => {
    const buttons = [];
    if (admin) {
      buttons.push(
        <Button key={`${id}_${1}`} onClick={() => onDelete(id)} danger>
          Удалить
        </Button>
      );
      if (!approved) {
        buttons.push(
          <Button key={`${id}_${2}`} onClick={() => onApproved(id)} primary>
            Одобрить
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="news-item">
      <h3 className="news-item__title">{title}</h3>
      <p className="news-item__text">{text}</p>
      <div className="news-item__date">{date}</div>
      <div className="news-item__btns">{adminPanel()}</div>
    </div>
  );
}

NewsOne.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  admin: PropTypes.bool,
  date: PropTypes.string,
  approved: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onApproved: PropTypes.func.isRequired,
};

NewsOne.defaultProps = {
  text: "",
  date: "",
  admin: false,
};

export default NewsOne;
