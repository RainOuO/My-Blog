import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./pages/HomePage";
import PDFContent from "./components/PDF/PDFContent";
import Signin from "./pages/Signin";
import Post from "./pages/Post";
// import NewPost from "./pages/NewPost";
import PostInfo from "./pages/PostInfo";
import MyMenu from "./components/MyMenu";
import socketIO from "socket.io-client";
import MyPosts from "./pages/MyPosts";
import Mycollections from "./pages/Mycollections";
import Mysettings from "./pages/MySettings/Mysettings";
import AboutMe from "./pages/AboutMe";
import "./styles/style.scss";
import firebase from "./utils/firebase";
import { useEffect, useState } from "react";
import Loading from "./components/layout/Loading";
import Undefined404 from "./pages/Undefined404";
import { io } from "socket.io-client";
const API_URL = process.env.REACT_APP_OPEN_URL;
const NgrokCookie = API_URL.replace("https://", "");
console.log("API_URL", API_URL);
console.log("NgrokCookie=======", NgrokCookie);
// const socket = io(API_URL, {
//   transports: ["websocket"],
//   withCredentials: true,
//   extraHeaders: {
//     "Access-Control-Allow-Origin": API_URL,
//     "Access-Control-Allow-Methods": "GET,POST",
//     "Access-Control-Allow-Headers": "my-custom-header",
//     "Access-Control-Allow-Credentials": true,
//   },
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
    document.cookie = `abuse_interstitial=${NgrokCookie}`;
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
        <Route path="/AboutMe" element={<AboutMe socket={socket} />}></Route>
        <Route path="/PDF" element={<PDFContent socket={socket} />}></Route>
        <Route
          path="/post"
          element={<Post socket={socket} usersLodaing={usersLodaing} />}
        ></Route>
        <Route path="/signin" element={<Signin />}></Route>
        {/* <Route path="/new-post" element={<NewPost />}></Route> */}
        <Route path="/Loading" element={<Loading />}></Route>

        <Route
          path="/postInfo/:postId"
          element={<PostInfo usersLodaing={usersLodaing} socket={socket} />}
        ></Route>
        <Route path="/MyMenu" element={<MyMenu />}></Route>
        <Route path="/my/posts" element={<MyPosts />}></Route>
        <Route path="/my/collections" element={<Mycollections />}></Route>
        <Route path="/my/settings" element={<Mysettings />}></Route>
        <Route path="/404" element={<Undefined404 />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
