import React, { useEffect, useState } from "react";
import "./_loading.scss";
import firebase from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  handleSuccess,
  handleFailed,
  handleWarning,
  handleInfo,
  handleWarningComfirm,
  handleSucccessComfirm,
  handleInfoComfirm,
} from "../../../utils/handler/handleStatusCard";
const Loading = () => {
  const [usersLodaing, setUsersLodaing] = useState(null);
  useEffect(() => {
    // onAuthStateChanged判斷登入使用狀態
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUsersLodaing(currentUser);
    });
  }, []);
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="loading_page"></div>
      <div className="loading_drop">
        <div
          className="loading_loader"
          onClick={handleWarningComfirm(
            "您沒有登入1",
            () => {
              navigate("/signin");
            },
            "請登入後再進行回復"
          )}
        ></div>
      </div> */}
      <div className="text-center py-5">
        <p className="text-center pt-5 m-0">
          {"使用方式：當成 function 直接呼叫"}
          <br />
          <span style={{ color: "green" }}>
            {"handleSuccess( 標題, 跳轉頁面路徑, 說明文字)"}
          </span>

          <br />
          <br />
          {"三個參數型別都是字串 第三個參數接受 html格式，"}
          <br />
          {`但要用字串方式傳入，例如傳入 '<p style="color: red;"></p>'`}
          <br />
          <br />
          {"三個參數都非必填，或是可以填入 false"}
          <br />
          {`例如：handleSuccess( '註冊成功',  false,  '<p style="color: green;">快去購買商品吧！</p>')`}
          <br />
          {
            "上面這個呼叫意味著他會出現成功的 icon 並且顯示「註冊成功」標題及說明文字，但不跳轉"
          }
        </p>
        上述範例：
        <button
          className="btn btn-info m-3 text-white fw-bold"
          style={{ background: "green" }}
          onClick={() => {
            return handleSuccess(
              "註冊成功",
              false,
              '<p style="color: green;">快去購買商品吧！</p>'
            );
          }}
        >
          註冊成功
        </button>
        <br />
        {
          "0916 下午新增：handleWarningComfirm( 標題, function(){...do somthing}, 說明文字)"
        }
        <br />
        {"第二個參數為用戶按下確認後執行的函式"}
        <br />
        上述範例：
        <button
          className="btn m-3 text-white fw-bold"
          style={{ background: "orange" }}
          onClick={() => {
            handleWarningComfirm(
              "登入成功",
              () => {
                console.log("This function will doing somthing");
                alert("做某些事");
              },
              "我們發現您的個人資料尚未齊全，是否前往修改？"
            );
          }}
        >
          Do or Not ?
        </button>
        <button
          className="btn m-3 text-white fw-bold"
          style={{ background: "green" }}
          onClick={() => {
            handleSucccessComfirm(
              "登入成功",
              () => {
                console.log("This function will doing somthing");
                alert("做某些事");
              },
              "我們發現您的個人資料尚未齊全，是否前往修改？"
            );
          }}
        >
          Do or Not ?
        </button>
        <button
          className="btn m-3 text-white fw-bold"
          style={{ background: "blue" }}
          onClick={() => {
            handleInfoComfirm(
              "登入成功",
              () => {
                console.log("This function will doing somthing");
                alert("做某些事");
              },
              "我們發現您的個人資料尚未齊全，是否前往修改？"
            );
          }}
        >
          Do or Not ?
        </button>
        <br />
        <button
          className="btn btn-dark m-3 text-white fw-bold"
          onClick={() => {
            handleSuccess("事件成功文字");
          }}
        >
          成功：沒有跳轉
        </button>
        <button
          className="btn btn-primary m-3 text-white fw-bold"
          onClick={() => {
            handleSuccess("事件成功文字", "/");
          }}
        >
          成功：有跳轉
        </button>
        <br />
        <button
          className="btn btn-dark m-3 text-white fw-bold"
          onClick={() => {
            handleFailed("事件失敗文字");
          }}
        >
          失敗：沒有跳轉
        </button>
        <button
          className="btn btn-primary m-3 text-white fw-bold"
          onClick={() => {
            handleFailed("事件失敗文字", "/");
          }}
        >
          失敗：有跳轉
        </button>
        <br />
        <button
          className="btn btn-dark m-3 text-white fw-bold"
          onClick={() => {
            handleWarning("警告文字");
          }}
        >
          警告：沒有跳轉
        </button>
        <button
          className="btn btn-primary m-3 text-white fw-bold"
          onClick={() => {
            handleWarning("警告文字", "/");
          }}
        >
          警告：有跳轉
        </button>
        <br />
        <button
          className="btn btn-dark m-3 text-white fw-bold"
          onClick={() => {
            handleInfo("提示文字");
          }}
        >
          提示：沒有跳轉
        </button>
        <button
          className="btn btn-primary m-3 text-white fw-bold"
          onClick={() => {
            handleInfo("提示文字", "/");
          }}
        >
          提示：有跳轉
        </button>
        <br />
      </div>
    </>
  );
};

export default Loading;
