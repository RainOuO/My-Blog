import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Homepage from "./pages/HomePage";
import PDFContent from "./components/PDF/PDFContent";
import Signin from "./pages/Signin";
import Post from "./pages/Post";
import PostInfo from "./pages/PostInfo";
import MyMenu from "./components/MyMenu";
// import socketIO from "socket.io-client";
import MyPosts from "./pages/MyPosts";
import Mycollections from "./pages/Mycollections";
import Mysettings from "./pages/MySettings/Mysettings";
import AboutMe from "./pages/AboutMe";
import Layouts from "./components/layout/Layouts";
import "./styles/style.scss";
import firebase from "./utils/firebase";
import { useEffect, useState } from "react";
import Loading from "./components/layout/Loading";
import Undefined404 from "./pages/Undefined404";
// import { io } from "socket.io-client";
// const API_URL = process.env.REACT_APP_OPEN_URL;
// const NgrokCookie = API_URL.replace("https://", "");
// console.log("NgrokCookie=======", NgrokCookie);
// const socket = io(API_URL, {
//   withCredentials: true,
//   "content-type": "text/plain; charset=UTF-8",
//   extraHeaders: {
//     "my-custom-header": "https://social-blog-4b1c8.web.app",
//   },
// });
// const socket = socketIO.connect("http://localhost:3002");
// const socket = io("wss://7e18-114-32-110-136.jp.ngrok.io");
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
  const [newPost, setNewPosts] = useState(false);
  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <Layouts
              usersLodaing={usersLodaing}
              guestLodaing={guestLodaing}
              setNewPosts={setNewPosts}
              newPost={newPost}
            />
          }
        >
          <Route path="/AboutMe" element={<AboutMe />}></Route>
          <Route path="/PDF" element={<PDFContent />}></Route>
          <Route
            path="/post"
            element={
              <Post
                usersLodaing={usersLodaing}
                newPost={newPost}
                setNewPosts={setNewPosts}
              />
            }
          ></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/Loading" element={<Loading />}></Route>
          <Route
            path="/postInfo/:postId"
            element={<PostInfo usersLodaing={usersLodaing} />}
          ></Route>
          <Route path="/MyMenu" element={<MyMenu />}></Route>
          <Route path="/my/posts" element={<MyPosts />}></Route>
          <Route path="/my/collections" element={<Mycollections />}></Route>
          <Route path="/my/settings" element={<Mysettings />}></Route>
          <Route path="/404" element={<Undefined404 />}></Route>
        </Route>
        <Route
          path="/"
          element={<Homepage setguestLodaing={setguestLodaing} />}
        />
      </Routes>
      <Routes element={<Layouts />}></Routes>
      <Footer />
    </div>
  );
}

export default App;
