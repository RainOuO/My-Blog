import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Homepage from './pages/HomePage';
import Post from './pages/Post';
import PostInfo from './pages/PostInfo';
// import socketIO from "socket.io-client";
import MyPosts from './pages/MyPosts';
import Mycollections from './pages/Mycollections';
import Mysettings from './pages/MySettings/Mysettings';
import AboutMe from './pages/AboutMe';
import Layouts from './components/layout/Layouts';
import './styles/style.scss';
import Loading from './components/layout/Loading';
import Undefined404 from './pages/Undefined404';
import { AuthConextProvider } from './hooks/auth-context';
import ErrorPage from './pages/Error/Error';
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
  const router = createBrowserRouter([
    { path: '/', errorElement: <ErrorPage />, element: <Homepage /> },
    {
      element: <Layouts />,
      children: [
        {
          path: '/AboutMe',
          element: <AboutMe />,
        },
        {
          path: '/post',
          element: <Post />,
        },
        {
          path: '/Loading',
          element: <Loading />,
        },
        {
          path: '/postInfo/:postId',
          element: <PostInfo />,
        },
        {
          path: '/my/posts',
          element: <MyPosts />,
        },
        {
          path: '/my/collections',
          element: <Mycollections />,
        },
        {
          path: '/my/settings',
          element: <Mysettings />,
        },
        {
          path: '/404undefined',
          element: <Undefined404 />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <AuthConextProvider>
        <RouterProvider router={router} />
        <Footer />
      </AuthConextProvider>
    </div>
  );
}

export default App;
