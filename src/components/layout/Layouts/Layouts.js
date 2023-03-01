import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layouts = ({ setNewPosts, newPost }) => {
  return (
    <>
      <Header newPost={newPost} setNewPosts={setNewPosts} />
      <Outlet />
    </>
  );
};

export default Layouts;
