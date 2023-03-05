import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Waypoint } from "react-waypoint";
import Modal from "react-bootstrap/Modal";
import firebase from "../../utils/firebase";
import "firebase/compat/storage";
import ChatPage from "../../components/ChatPage/ChatPage";
import { handleWarningComfirm } from "../../utils/handler/handleStatusCard";
import photo_backgroung from "../../images/photo_backgroung.jpg";
import Chatbot from "../Chatbot/Chatbot";

import "./_Post.scss";

const Post = ({ socket, usersLodaing, newPost, setNewPosts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [Likecancel, setLikeCancel] = useState(false);
  const [postLikeID, setPostLikeID] = useState("");
  const [likeee, setLikeee] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const lastPostSnapshotRef = useRef();
  const userLikes = firebase.auth().currentUser?.displayName;
  useEffect(() => {
    fetchPosts();
  }, [Likecancel]);

  //只有一發表文章newPost狀態會變成true 就會重新render撈firebase資料渲染畫面 原先是fasle 發文後會變成ture
  useEffect(() => {
    if (newPost) {
      fetchPosts();
      setNewPosts(false);
    }
  }, [newPost]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(4)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
    return () => unsubscribe();
  }, []);

  const handleLike = async (postId) => {
    let WhoLikesID = posts.filter((v) => v.id.includes(postId));
    const whoLikes = WhoLikesID[0]?.LikeBy.filter((e) => e === userLikes || "");
    const toogleLike = whoLikes?.includes(userLikes);
    const postRef = firebase.firestore().collection("posts").doc(postId);
    const email = firebase.auth().currentUser.email;
    const likeuserPhoto = firebase.auth().currentUser.photoURL;
    if (toogleLike) {
      await postRef.update({
        LikeBy: firebase.firestore.FieldValue.arrayRemove(userLikes),
        LikeByEmail: firebase.firestore.FieldValue.arrayRemove(email),
        LikeuserPhot: firebase.firestore.FieldValue.arrayRemove(likeuserPhoto),
      });
      setLikeee((prev) => {
        const newState = [...prev];
        newState[postId] = false;
        console.log("if刪除", newState);
        return newState;
      });
      console.log("likeee刪除", likeee);
    } else {
      await postRef.update({
        LikeBy: firebase.firestore.FieldValue.arrayUnion(userLikes),
        LikeByEmail: firebase.firestore.FieldValue.arrayUnion(email),
        LikeuserPhot: firebase.firestore.FieldValue.arrayUnion(likeuserPhoto),
      });
      setLikeee((prev) => {
        const newState = [...prev];
        newState[postId] = true;
        console.log("newState", newState);
        return newState;
      });
      console.log("likeee增加", likeee);
    }
  };
  useEffect(() => {
    setLikeee(posts.map((e) => e.LikeBy.includes(userLikes)));
  }, [posts]);

  const fetchPosts = () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(4)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        lastPostSnapshotRef.current =
          collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
        setPosts(data);
        setNewPosts(false);
      });
  };

  const commentID = posts.map((e) => e.id);
  const newComment = commentID.filter((id) => id === postLikeID);
  const postListID = posts.filter((post) => post.id === newComment[0]);

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
                    <Link to={`/postInfo/${post.id}`} className="post_linkImg">
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
                                  // className="pe-lg-3 pe-md-2 likeIcon "
                                  className="heart"
                                  onClick={() => {
                                    GuestSubmit();
                                  }}
                                >
                                  {likeee[index] !== false ? (
                                    <FcLike size={20} />
                                  ) : (
                                    <FcLikePlaceholder size={20} />
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  // className="pe-3 likeIcon "
                                  className="heart"
                                  onClick={() => {
                                    handleLike(post.id);
                                  }}
                                >
                                  {likeee[index] ? (
                                    <FcLike
                                      size={20}
                                      onClick={() => setLikeCancel(false)}
                                    />
                                  ) : (
                                    <FcLikePlaceholder
                                      size={20}
                                      onClick={() => setLikeCancel(true)}
                                    />
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
                            {post.LikeBy == "" ? (
                              <span></span>
                            ) : post.LikeBy.length > 1 ? (
                              <span>
                                和其他
                                {post.LikeBy?.length - 1 || ""}人都說讚
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </div>
                          {/* <div className="col-lg-2 col-md-2 text-end pe-4">
                            <BsBookmark className="BsBookmark" />
                          </div> */}
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className="text-center">
                              <Modal.Title>說讚的用戶</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="row">
                                {/* <div className="col-2 otherLikes_photo"></div> */}
                                <div className="col-12">
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
                                              <div className="d-flex">
                                                <div className="modal_like_photo">
                                                  <img src={v.photo} alt="" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                  <p className="modal_like_userName">
                                                    {v.name}
                                                  </p>
                                                </div>
                                              </div>

                                              <br />
                                              {/* <p>{v.email}</p> */}
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
