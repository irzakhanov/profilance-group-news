import React from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PropTypes from "prop-types";

function AddNewsForm({ onSubmit, setTitle, setText, title, text, addLoading }) {
  return (
    <div className="news-page__add-form">
      <form onSubmit={onSubmit}>
        <Input placeholder="Введите заголовок" value={title} onChange={setTitle} />
        <textarea placeholder="Введите текст новости..." value={text} onChange={setText}></textarea>
        <Button primary>{addLoading ? "Загрузка" : "Сохранить"}</Button>
      </form>
    </div>
  );
}

AddNewsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  addLoading: PropTypes.bool.isRequired,
};

export default AddNewsForm;
