import React from "react";
import NewsWrap from "../../features/news/NewsWrap";

function News({ user, isAuth }) {
  return <NewsWrap user={user} isAuth={isAuth} />;
}

export default News;
