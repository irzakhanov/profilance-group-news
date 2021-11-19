import React from "react";
import { Routes as SwitchRoutes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import News from "../components/pages/News";

function Routes({ user, isAuth }) {
  return (
    <SwitchRoutes>
      <Route path="/" element={<Home user={user} isAuth={isAuth} />} />
      <Route path="/news" element={<News user={user} isAuth={isAuth} />} />
    </SwitchRoutes>
  );
}

export default Routes;
