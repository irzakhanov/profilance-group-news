import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/profile/profileSlice";
import logo from "../../assets/img/logo.svg";

function Header({ setIsOpenModal, isAuth }) {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setIsOpenModal(true);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsOpenModal(false);
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <img src={logo} alt="Profilance Group" />
      </NavLink>
      <div className="header__menu">
        {!isAuth ? (
          <button className="header__login" onClick={handleLoginClick}>
            Вход
          </button>
        ) : (
          <button className="header__login" onClick={handleLogoutClick}>
            Выход
          </button>
        )}

        <NavLink to="/news">Новости</NavLink>
      </div>
    </header>
  );
}

export default Header;
