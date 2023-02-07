import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../../utils/firebase";
import { BsBookmark } from "react-icons/bs";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import ChatPage from "../../components/ChatPage/ChatPage";
import { Waypoint } from "react-waypoint";
import photo_backgroung from "../../images/photo_backgroung.jpg";
import Modal from "react-bootstrap/Modal";
import { handleWarningComfirm } from "../../utils/handler/handleStatusCard";

import "firebase/compat/storage";
import "./_Post.scss";

const Post = ({ socket, usersLodaing }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [Likecancel, setLikeCancel] = useState(false);
  const [postLikeID, setPostLikeID] = useState("");
  const [likeee, setLikeee] = useState([]);
  // console.log("這是true 或false", likeee);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const lastPostSnapshotRef = useRef();
  // console.log("目前文章", posts);
  useEffect(() => {
    //第一次拉firebase資料渲染
    firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        lastPostSnapshotRef.current =
          collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
        setPosts(data);
      });
    userLike();
    //點擊愛心後的函式
  }, [Likecancel]);
  useEffect(() => {
    let like_icon = posts.map((e) => {
      return e.LikeBy.includes(userLikes);
    });
    setLikeee(like_icon);
  }, [posts]);
  const userLikes = firebase.auth().currentUser?.displayName;
  let WhoLikesID = posts.filter((v) => {
    return v.id.includes(postLikeID);
  });
  const whoLikes = WhoLikesID[0]?.LikeBy.filter((e) => {
    return e === userLikes || "";
  });
  //判斷使用者是否有點過
  const toogleLike = whoLikes?.includes(
    firebase.auth().currentUser?.displayName
  );
  const commentID = posts.map((e) => {
    return e.id;
  });
  const NewComment = commentID.filter((x) => {
    return x === postLikeID;
  });
  const postListID = posts.filter((e) => {
    return e.id === NewComment[0];
  });
  async function userLike() {
    const emails = firebase.auth().currentUser.email;
    const LikeuserPhoto = firebase.auth().currentUser.photoURL;

    const likeuser = firebase.auth().currentUser.displayName;
    if (toogleLike) {
      await firebase
        .firestore()
        .collection("posts")
        .doc(postLikeID)
        .update({
          LikeBy: firebase.firestore.FieldValue.arrayRemove(likeuser),
          LikeByEmail: firebase.firestore.FieldValue.arrayRemove(emails),
          LikeuserPhot:
            firebase.firestore.FieldValue.arrayRemove(LikeuserPhoto),
        });
    } else {
      await firebase
        .firestore()
        .collection("posts")
        .doc(postLikeID)
        .update({
          LikeBy: firebase.firestore.FieldValue.arrayUnion(likeuser),
          LikeByEmail: firebase.firestore.FieldValue.arrayUnion(emails),
          LikeuserPhot: firebase.firestore.FieldValue.arrayUnion(LikeuserPhoto),
        });
    }
  }
  function GuestSubmit() {
    handleWarningComfirm(
      "你沒有登入",
      () => {
        navigate("/");
      },
      "所以不能按讚唷~點擊確認到首頁登入google吧!"
    );
  }
  return (
    <>
      <div className="container post custom-container">
        <ChatPage socket={socket} />
        <h2 className="text-center">
          Portfolio
          <br />
          Most recent works
        </h2>
        <div className="row">
          {posts !== "" ? (
            posts.map((post, index) => {
              return (
                <div
                  key={post.id}
                  className="col-xl-5 col-md-6 mx-auto col-12 post_map_content"
                >
                  <div className="col-12 d-flex justify-content-center ">
                    <Link to={`/postInfo/${post.id}`}>
                      <img
                        className="photo"
                        src={post.imageUrl ? post.imageUrl : photo_backgroung}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="col-12  ">
                    <div className="article mx-auto ">
                      <div className="">
                        <div className="row ">
                          <div className="col-lg-3 d-flex col-md-4">
                            {usersLodaing === null ? (
                              <>
                                <span
                                  className="pe-lg-3 pe-md-2 likeIcon "
                                  onClick={() => {
                                    GuestSubmit();
                                  }}
                                >
                                  {likeee[index] !== false ? (
                                    <FcLike />
                                  ) : (
                                    <FcLikePlaceholder />
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className="pe-3 likeIcon "
                                  onClick={() => {
                                    setPostLikeID(post.id);
                                    setLikeCancel(!Likecancel);
                                  }}
                                >
                                  {likeee[index] !== false ? (
                                    <FcLike />
                                  ) : (
                                    <FcLikePlaceholder />
                                  )}
                                </span>
                              </>
                            )}

                            <p>{post.LikeBy?.[0] || "0"}</p>
                          </div>
                          <div
                            className=" d-inline otherLikes col-lg-7 col-md-6"
                            onClick={() => {
                              handleShow();
                              setPostLikeID(post.id);
                            }}
                          >
                            {post.LikeBy === undefined ? (
                              <span></span>
                            ) : (
                              <span>
                                和其他
                                {post.LikeBy?.length || ""}人都說讚
                              </span>
                            )}
                          </div>
                          <div className="col-lg-2 col-md-2 text-end pe-4">
                            <BsBookmark className="BsBookmark" />
                          </div>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className="text-center">
                              <Modal.Title>說讚的用戶</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="row">
                                <div className="col-2 otherLikes_photo"></div>
                                <div className="col-10">
                                  {postListID.map((e) => {
                                    let likeList = e.LikeBy;
                                    let likeEmail = e.LikeByEmail;
                                    let likeuserImage = e.LikeuserPhot;
                                    let tidyUser_info = [];
                                    for (let i = 0; i < likeList.length; i++) {
                                      let newsssss = {
                                        name: likeList[i],
                                        email: likeEmail[i],
                                        photo: likeuserImage[i],
                                      };
                                      tidyUser_info.push(newsssss);
                                    }
                                    return (
                                      <>
                                        {tidyUser_info.map((v) => {
                                          return (
                                            <>
                                              <img src={v.photo} alt="" />
                                              <p>{v.name}</p>
                                              <br />
                                              <p>{v.email}</p>
                                            </>
                                          );
                                        })}
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </div>
                      </div>
                      <div className="post_description">
                        <span className="pe-3">
                          {post.author?.displayName || "使用者"}
                        </span>
                        <span className="post_title">{post.title}</span>
                      </div>
                      <Link to={`/postInfo/${post.id}`}>
                        <p className="my-2">
                          查看全部{post.commentsCount || 0}則留言
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div style={{ height: "80vh" }}>
                <h1 className="text-center mt-5">網頁搜尋不到 請重新整理</h1>
              </div>
            </>
          )}
        </div>
      </div>
      <Waypoint
        onEnter={() => {
          if (lastPostSnapshotRef.current) {
            firebase
              .firestore()
              .collection("posts")
              .orderBy("createdAt", "desc")
              .startAfter(lastPostSnapshotRef.current)
              .limit(2)
              .get()
              .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((docSnapshot) => {
                  const id = docSnapshot.id;
                  return { ...docSnapshot.data(), id };
                });
                lastPostSnapshotRef.current =
                  collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts([...posts, ...data]);
              });
          }
        }}
      />
    </>
  );
};

export default Post;
