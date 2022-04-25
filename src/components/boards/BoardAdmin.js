import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../services/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        console.log("content: " + JSON.stringify(content))
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin board</h3>
        {JSON.stringify(content)}
      </header>
    </div>
  );
};

export default BoardAdmin;