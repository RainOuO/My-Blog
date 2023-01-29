import React, { useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Photo from "../../images/dogs.png";
import { useNavigate } from "react-router-dom";
import "./_NewPost.scss";
const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const documentRef = firebase.firestore().collection("posts").doc();
    const fileRef = firebase.storage().ref("post-images/" + documentRef.id);
    console.log("圖片REF", fileRef);
    const metadata = {
      contentType: file.type,
    };
    //  指定變成file的type類型
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
  // const previewUrl = file
  //   ? URL.createObjectURL(file)
  //   : "https://picsum.photos/200/300";
  return (
    <>
      <div className="Newpost">
        <div style={{ minHeight: "40vh" }}></div>
        <div className="container">
          <form action="" onSubmit={onSubmit}>
            <div>
              <div>
                <img className="w-25" src={Photo} alt="" />
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
            <div>
              <textarea
                className="w-100"
                placeholder="輸入文章內容"
                name=""
                id=""
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button type="submit">送出</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPost;
