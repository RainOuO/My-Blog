import React, { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import firebase from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import dogs from "../../images/dogs.png";
import ChatPage from "../../components/ChatPage/ChatPage";
import "./_homepage.scss";

const Homepage = ({ socket, setguestLodaing }) => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  function onSubmit(e) {
    e.preventDefault();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log("成功登入", res);
        navigate("/post");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function guestSubmit() {
    setguestLodaing(null);
    navigate("/post");
  }
  return (
    <>
      <div className="header-background"></div>
      <div className="homeContainer">
        <div className="container custom-container">
          <ChatPage socket={socket} />
          <div className="row">
            <div className=" col-12 home-header">
              <div className="d-flex home-header_img justify-content-center">
                <img src={dogs} alt="" />
              </div>
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
                            stroke="#e4dcbe"
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
            <div className="col-12 loading-state">
              <div className="row">
                <div className=" col-6 d-flex justify-content-center">
                  <button className="btn guest-btn" onClick={guestSubmit}>
                    訪客模式
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button onClick={onSubmit} className="login-with-google-btn">
                    Google登入
                  </button>
                </div>
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
                  在技術文章中或是其他文章內也穿接了google loading API來登入，{" "}
                  <br /> 登入後即可留言和按讚，
                  留言後也會寄送Email通知我說您留什麼內容好讓我回答您。
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
