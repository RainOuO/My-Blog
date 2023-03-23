import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import AuthContext from '../../../hooks/auth-context';
import Header from '../Header';

const Layouts = () => {
  const contextData = useContext(AuthContext);
  return (
    <>
      <Header
        newPost={contextData.newPost}
        setNewPosts={contextData.setNewPosts}
      />
      <Outlet />
    </>
  );
};

export default Layouts;
