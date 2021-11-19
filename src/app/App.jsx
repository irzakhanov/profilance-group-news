import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/news/newsSlice";
import { selectUser, selectIsAuth } from "../features/profile/profileSlice";
import Header from "../components/layout/Header";
import Routes from "./Routes";
import Modal from "../components/ui/Modal";
import Login from "../features/profile/Login";

function App() {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="container">
        <Header setIsOpenModal={setIsOpenModal} user={user} isAuth={isAuth} />
        <Routes user={user} isAuth={isAuth} />
      </div>
      {!isAuth && isOpenModal && (
        <Modal setVisible={setIsOpenModal}>
          <Login />
        </Modal>
      )}
    </div>
  );
}

export default App;
