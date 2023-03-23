import React, { useState, useEffect } from 'react';
import firebase from '../utils/firebase';

const AuthContext = React.createContext({
  newPost: false,
  setNewPosts: () => {},
  guestLodaing: null,
  usersLodaing: null,
});

export const AuthConextProvider = (props) => {
  const [newPost, setNewPosts] = useState(false);
  const [usersLodaing, setUsersLodaing] = useState(null);
  const [guestLodaing, setguestLodaing] = useState(null);
  useEffect(() => {
    // onAuthStateChanged判斷登入使用狀態
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUsersLodaing(currentUser);
    });
    setguestLodaing(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        newPost: newPost,
        usersLodaing: usersLodaing,
        guestLodaing: guestLodaing,
        setNewPosts: setNewPosts,
        setUsersLodaing: setUsersLodaing,
        setguestLodaing: setguestLodaing,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
