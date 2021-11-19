import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventLoader from "../../components/ui/EventLoader";
import Modal from "../../components/ui/Modal";
import NewsOne from "./NewsOne";
import {
  selectLoading,
  selectAddLoading,
  selectNews,
  selectNewsByApproved,
  addNews,
  approveNews,
  deleteNews,
} from "./newsSlice";
import Button from "../../components/ui/Button";
import AddNewsForm from "./AddNewsForm";
import Input from "../../components/ui/Input";

function NewsWrap({ user, isAuth }) {
  const dispatch = useDispatch();

  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");

  const loading = useSelector(selectLoading);
  const addLoading = useSelector(selectAddLoading);

  const news = useSelector(user.role === "admin" ? selectNews : selectNewsByApproved);
  const newsFilter = news.filter(
    (item) => item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );
  if (loading) {
    return (
      <div className="loading-block">
        <EventLoader />
      </div>
    );
  }

  const handleClick = () => {
    setIsOpenAddForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateNow = new Date();
    const date = `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;

    await dispatch(addNews({ title, text, date, approved: false }));
    setTitle("");
    setText("");
    setIsOpenAddForm(false);
  };

  const onDelete = (id) => {
    dispatch(deleteNews(id));
  };

  const onApproved = (id) => {
    dispatch(approveNews(id));
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="news-page">
      <div className="news-header">
        <h2 className="news-header__title">Новости</h2>
        <div className="news-header__search">
          <Input value={searchText} placeholder="поиск..." onChange={handleChange} />
        </div>
      </div>
      {isAuth && (
        <div className="news-page__add-btn">
          <Button primary onClick={handleClick}>
            Добавить новость
          </Button>
        </div>
      )}
      <div className="news">
        {news &&
          newsFilter.map((item, index) => (
            <NewsOne
              key={`${item.id}_${index}`}
              id={item.id}
              title={item.title}
              text={item.text}
              date={item.date}
              admin={user.role === "admin"}
              approved={item.approved}
              onDelete={onDelete}
              onApproved={onApproved}
            />
          ))}
      </div>
      {isOpenAddForm && (
        <Modal setVisible={setIsOpenAddForm}>
          <AddNewsForm
            addLoading={addLoading}
            onSubmit={handleSubmit}
            setTitle={(e) => setTitle(e.target.value)}
            setText={(e) => setText(e.target.value)}
            title={title}
            text={text}
          />
        </Modal>
      )}
    </div>
  );
}

export default NewsWrap;
