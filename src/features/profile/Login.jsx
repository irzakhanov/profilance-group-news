import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, selectError, selectLoading } from "./profileSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Alert from "../../components/ui/Alert";

function Login() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const handleChange = (e) => {
    if (e.target.name === "login") {
      setLogin(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction({ login, password }));
  };

  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Введите логин..."
          name="login"
          onChange={handleChange}
          value={login}
          error={!!error}
        />
        <Input
          placeholder="Введите пароль..."
          name="password"
          onChange={handleChange}
          value={password}
          error={!!error}
        />
        <div className="login__button">
          <Button primary>{loading ? "Load" : "Войти"}</Button>
        </div>
      </form>
      {error && <Alert>{error}</Alert>}
    </div>
  );
}

export default Login;
