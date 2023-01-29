import React, { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

import firebase from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import "./_Signin.scss";
const Signin = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("register");
  const [loginMember, setLoginMember] = useState({
    email: "baby45645678@google.com",
    password: "asdgg12345",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const provider = new GoogleAuthProvider();

  function handleChange(e) {
    setLoginMember({ ...loginMember, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    e.preventDefault();
    if (activeItem === "register") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(loginMember.email, loginMember.password)
        .then((res) => {
          console.log("成功", res);
          navigate("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;
            default:
          }
        });
    } else if (activeItem === "signin") {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          console.log("成功登入", res);
          const name = res.user.displayName;
          const email = res.user.email;
          const profilePicture = res.user.photoURL;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-6"
            // active={activeItem === "register"}
            onClick={() => {
              setErrorMessage("");
              setActiveItem("register");
            }}
          >
            註冊
          </div>
          <div
            className="col-6"
            // active={activeItem === "signin"}
            onClick={() => {
              setErrorMessage("");
              setActiveItem("signin");
            }}
          >
            登入
          </div>
        </div>
        <form action="" onSubmit={onSubmit}>
          <h1>{localStorage.getItem("name")}</h1>
          <h1>{localStorage.getItem("email")}</h1>
          <img src={localStorage.getItem("profilePicture")} alt="" />

          <div className="row">
            <div className="col-12">
              <label htmlFor="">信箱</label>
              <input
                value={loginMember.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="請輸入信箱"
              />
            </div>
            <div className="col-12">
              <label htmlFor="">密碼</label>
              <input
                value={loginMember.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="請輸入密碼"
              />
            </div>
            <div className="col-12">
              <button className="login-with-google-btn">
                {errorMessage && (
                  <>
                    <div>
                      <p>{errorMessage}</p>
                    </div>
                  </>
                )}
                {activeItem === "register" ? "註冊" : "登入"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
