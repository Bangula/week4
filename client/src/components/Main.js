import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import Chat from "./chat-room/Chat";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/chat-room/:username?/:room?" component={Chat} />
    </Switch>
  );
};

export default Main;
