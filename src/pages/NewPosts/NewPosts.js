import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../utils/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import defaultPhoto from '../../images/photo_backgroung.jpg';
import PostEditor from '../../components/WYSIWYG/PostEditor';
import './_NewPosts.scss';
import { handleWarningComfirm } from '../../utils/handler/handleStatusCard';
import AuthContext from '../../hooks/auth-context';

const NewPosts = ({ setShow }) => {
  const contextData = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [getData, setGetData] = useState('');
  const [postData, setPostData] = useState({
    title: '',
    location: '',
    tags: '',
    photo: '',
    content: '',
  });

  //>>所見即所得，輸入資料更新用
  const handleGetDataChange = (e, editor) => {
    const data = editor.getData();
    setGetData(data);
  };

  function onSubmit(e) {
    e.preventDefault();
    const documentRef = firebase.firestore().collection('posts').doc();
    const fileRef = firebase.storage().ref('post-images/' + documentRef.id);

    if (file === null) {
      handleWarningComfirm('圖片為空唷~請記得上傳', () => {
        handleWarningComfirm(
          '確認送出?',
          () => {
            fileRef
              .put(file)
              .then(() => {
                fileRef.getDownloadURL().then((imageUrl) => {
                  documentRef.set({
                    title,
                    content,
                    createdAt: firebase.firestore.Timestamp.now(),
                    author: {
                      displayName:
                        firebase.auth().currentUser.displayName || '',
                      photoURL: firebase.auth().currentUser.photoURL || '',
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
                  setShow(false);
                } catch (error) {
                  console.log(error);
                }
              });
          },
          '很開心您能與我們共享文章!'
        );
      });
    } else {
      handleWarningComfirm(
        '確認送出?',
        () => {
          fileRef
            .put(file)
            .then(() => {
              fileRef.getDownloadURL().then((imageUrl) => {
                documentRef.set({
                  title,
                  content,
                  createdAt: firebase.firestore.Timestamp.now(),
                  author: {
                    displayName: firebase.auth().currentUser.displayName || '',
                    photoURL: firebase.auth().currentUser.photoURL || '',
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
                setShow(false);
                contextData.setNewPosts(true);
              } catch (error) {
                console.log(error);
              }
            });
        },
        '很開心您能與我們共享文章!'
      );
    }
  }
  const previewUrl = file ? URL?.createObjectURL(file) : defaultPhoto;
  return (
    <>
      <div className="Newpost">
        {/* <div style={{ minHeight: "8vh" }}></div> */}
        <div className="container">
          <form action="" onSubmit={onSubmit}>
            <div>
              <div className="Newpost_img">
                <img className="" src={previewUrl} alt="" />
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
                  style={{ display: 'none' }}
                  id="post-image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <input
                className="form-control my-3"
                type="text"
                placeholder="輸入文章標題"
                name=""
                id=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <PostEditor
              className="postEditor_custom"
              postData={postData}
              setGetData={setGetData}
              handleContentChange={handleGetDataChange}
            />
            <button
              className="btn d-flex m-auto"
              type="submit"
              onClick={onSubmit}
            >
              送出
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPosts;
