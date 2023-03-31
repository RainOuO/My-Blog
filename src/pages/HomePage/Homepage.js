import React, { useContext } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import { FaUserCircle } from 'react-icons/fa';
// import ChatPage from '../../components/ChatPage/ChatPage';
import HomePaheHeader from '../HomePageHeader/HomePageHeader';
import Chatbot from '../Chatbot/Chatbot';
import './_homepage.scss';
import AuthContext from '../../hooks/auth-context';

const Homepage = ({ socket }) => {
  const contextData = useContext(AuthContext);
  const setguestLodaing = contextData.setguestLodaing;
  const usersLodaing = contextData.usersLodaing;
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  function onSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log('成功登入', res);
        navigate('/post');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function guestSubmit() {
    setguestLodaing(null);
    navigate('/post');
  }
  return (
    <>
      <HomePaheHeader />
      {/* <ChatPage socket={socket} /> */}
      <Chatbot />
      <video
        className="cloud-sunBackground"
        autoPlay
        loop
        muted
        poster="https://www.mitonedesign.jp/img/common/sunlight.jpg"
      >
        <source src="https://www.mitonedesign.jp/img/common/sunlight.mp4" />
      </video>
      <div className="header-background"></div>
      <div className="homeContainer">
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <a href="#down">
                <div className="mouse-hover">
                  <div>
                    <div className="mouser-box">
                      <div className="section-down-arrow">
                        <svg
                          className="nectar-scroll-icon"
                          viewBox="0 0 30 45"
                          enableBackground="new 0 0 30 45"
                        >
                          <path
                            className="nectar-scroll-icon-path"
                            fill="none"
                            stroke="#312d2b"
                            strokeWidth="2"
                            strokeMiterlimit="100"
                            d="M15,1.118c12.352,0,13.967,12.88,13.967,12.88v18.76  c0,0-1.514,11.204-13.967,11.204S0.931,32.966,0.931,32.966V14.05C0.931,14.05,2.648,1.118,15,1.118z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-12 d-md-flex align-items-end">
              <h2 className="welcome_h2">Welcome to RainBlog</h2>
            </div>
            <div className="col-6 ">
              <div className="row">
                {!usersLodaing && (
                  <>
                    <div className="col-12  d-flex justify-content-end">
                      <div className="js-anim_elm -button is-act">
                        <div className="c-button01 c-text07 -thin u-mt35 -delay2">
                          <p onClick={guestSubmit}>
                            <span className="text ">訪客模式</span>
                            <figure className="c-illust is-loaded">
                              <span>
                                <span>
                                  <FaUserCircle />
                                </span>
                              </span>
                            </figure>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!usersLodaing && (
                  <div className="col-12  d-flex justify-content-end ">
                    <div className="js-anim_elm -button is-act">
                      <div className="c-button01 c-text07 -thin u-mt35 -delay2 ">
                        <p className="" onClick={onSubmit}>
                          <span className="text ">Google登入</span>
                          <figure className="c-illust is-loaded">
                            <span>
                              <span>
                                <img
                                  className="google_btnPhoto"
                                  alt=""
                                  aria-hidden="true"
                                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                                />
                              </span>
                            </span>
                          </figure>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 about-Myblog" id="down">
              <div className="text-center mb-5">
                <h2>關於我的小型blog網站</h2>
              </div>
              <div className="mb-5">
                <p className="text-center">
                  這個網站會我個人簡介和Blog結合，裡面會記錄些我寫的相關技術文章，
                  之前寫過的side project。
                  <br />
                  還有個人介紹，如果對我個人自介有興趣，也能點擊下載成PDF方便觀看。
                  <br />
                  在這網站上也提供了客服聊天室，能提供些簡單的問題回答您。
                  <br />
                  在技術文章中或是其他文章內也穿接了google loading API來登入，{' '}
                  <br /> 登入後即可留言和按讚~
                  <br />
                  留言也會有即時line訊息通知我您說了什麼~歡迎大家登入google帳號來留言互動!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Homepage;
