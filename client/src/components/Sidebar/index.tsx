import React from "react";
import ChatList from "../ChatList";
import Header from "../Header";

export default function Sidebar() {
  return (
    <React.Fragment>
      <Header />
      <ChatList />
    </React.Fragment>
  );
}
