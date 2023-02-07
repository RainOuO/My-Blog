import React, { useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import defaultPhoto from "../../images/photo_backgroung.jpg";
import { useNavigate } from "react-router-dom";
import PostEditor from "../WYSIWYG/PostEditor";

// import "./_NewPost.scss";
const PDFContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // === 編輯時預覽圖片用 ===

  const [showPhoto, setShowPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  // === 取得所見即所得欄位資料  ===

  const [getData, setGetData] = useState("");
  console.log("取得所見即所得欄位資料", getData);
  const [postData, setPostData] = useState({
    title: "",
    location: "",
    tags: "",
    photo: "",
    content: "",
  });

  // function handleChange(e) {
  //   // console.log("handleChange", e.target.name, e.target.value);
  //   let newPostData = { ...postData };
  //   newPostData[e.target.name] = e.target.value;
  //   setPostData(newPostData);
  //   // console.log("這是ssss", postData);
  // }
  //>>所見即所得，輸入資料更新用
  const handleGetDataChange = (e, editor) => {
    const data = editor.getData();
    setGetData(data);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPostData({ title: "", location: "", tags: "", photo: "" });
    setGetData("");
  };

  function onSubmit(e) {
    e.preventDefault();
    const documentRef = firebase.firestore().collection("posts").doc();
    const fileRef = firebase.storage().ref("post-images/" + documentRef.id);
    console.log("圖片REF", fileRef);
    const metadata = {
      contentType: file.type,
    };
    fileRef
      .put(file, metadata)
      .then(() => {
        fileRef.getDownloadURL().then((imageUrl) => {
          documentRef.set({
            title,
            content,
            createdAt: firebase.firestore.Timestamp.now(),
            author: {
              displayName: firebase.auth().currentUser.displayName || "",
              photoURL: firebase.auth().currentUser.photoURL || "",
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
            },
            imageUrl,
            LikeBy: [],
            markdown: getData,
          });
        });
      })
      .then((res) => {
        try {
          console.log("res成功", res);
          navigate("/Post");
        } catch (error) {
          console.log(error);
        }
      });
  }
  const previewUrl = file ? URL?.createObjectURL(file) : defaultPhoto;
  return (
    <>
      <div className="Newpost">
        <div style={{ minHeight: "40vh" }}></div>
        <div className="container">
          <form action="" onSubmit={onSubmit}>
            <div>
              <div>
                <img className="w-25" src={previewUrl} alt="" />
              </div>
              <div>
                <div>
                  <label htmlFor="post-image" className="btn  bg-dark">
                    上傳文章圖片
                  </label>
                </div>
                <input
                  type="file"
                  name=""
                  style={{ display: "none" }}
                  id="post-image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <input
                className="w-100 mb-3"
                type="text"
                placeholder="輸入文章標題"
                name=""
                id=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <PostEditor
              postData={postData}
              setGetData={setGetData}
              handleContentChange={handleGetDataChange}
            />
            <button type="submit">送出</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PDFContent;
