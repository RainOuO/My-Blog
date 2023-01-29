import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./pages/HomePage";
import PDFContent from "./components/PDF/PDFContent";
import Signin from "./pages/Signin";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import PostInfo from "./pages/PostInfo";
import MyMenu from "./components/MyMenu";
import socketIO from "socket.io-client";
import MyPosts from "./pages/MyPosts";
import Mycollections from "./pages/Mycollections";
import Mysettings from "./pages/MySettings/Mysettings";
import "./styles/style.scss";
import firebase from "./utils/firebase";
import { useEffect, useState } from "react";
import Loading from "./components/layout/Loading";
import { io } from "socket.io-client";
const API_URL = process.env.REACT_APP_OPEN_URL;
// const socket = io(API_URL, {
//   withCredentials: true,
//   extraHeaders: { "my-custom-header": "abccd" },
// });
const socket = socketIO.connect("http://localhost:3002");
function App() {
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
    <div className="app">
      <Header usersLodaing={usersLodaing} guestLodaing={guestLodaing} />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage socket={socket} setguestLodaing={setguestLodaing} />
          }
        />
        <Route path="/PDF" element={<PDFContent socket={socket} />}></Route>
        <Route path="/post" element={<Post socket={socket} />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/new-post" element={<NewPost />}></Route>
        <Route path="/Loading" element={<Loading />}></Route>

        <Route
          path="/postInfo/:postId"
          element={<PostInfo usersLodaing={usersLodaing} socket={socket} />}
        ></Route>
        <Route path="/MyMenu" element={<MyMenu />}></Route>
        <Route path="/my/posts" element={<MyPosts />}></Route>
        <Route path="/my/collections" element={<Mycollections />}></Route>
        <Route path="/my/settings" element={<Mysettings />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
