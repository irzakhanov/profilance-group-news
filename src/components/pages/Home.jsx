import React from "react";

function Home({ user, isAuth }) {
  return (
    <div className="home-page">
      <h1>Привет, {isAuth ? user.login : "Гость"}</h1>
    </div>
  );
}

export default Home;
