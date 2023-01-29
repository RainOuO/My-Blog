import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import firebase from "../../utils/firebase";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "firebase/compat/storage";
import "./_PostInfo.scss";
import { handleWarningComfirm } from "../../utils/handler/handleStatusCard";
const API_URL = process.env.REACT_APP_OPEN_URL;
console.log("API_URL", API_URL);
const PostInfo = ({ usersLodaing }) => {
  console.log("使用者狀態", usersLodaing);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({ auther: {} });
  const [commentContent, setCommentContent] = useState("");
  const [userMessage, setuserMessage] = useState({});
  const [comments, setComments] = useState("");
  console.log("comments內容", comments);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      // onSnapshot 更新狀態監聽功能意思 只要postId值有改變 會更新Firestore資料 會馬上取得最新狀態
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        setPost(data);
      });
  }, []);
  // 處理留言狀態開始
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "desc")
      // 可以做一個選擇留言順序 更新desc
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setComments(data);
      });
  }, []);
  async function toggleCollected() {
    const uid = firebase.auth().currentUser.uid;

    if (isCollected) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    }
  }
  const isCollected = post.collectedBy?.includes(
    firebase.auth().currentUser?.uid
  );
  function toggleLiked() {
    // const uid = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const LikeuserPhoto = firebase.auth().currentUser.photoURL;
    const likeuser = firebase.auth().currentUser.displayName;
    console.log("LikeuserPhoto照片", LikeuserPhoto);
    if ((isLike, LikeByEmails, LikebyPhoto)) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          LikeBy: firebase.firestore.FieldValue.arrayRemove(likeuser),
          LikeByEmail: firebase.firestore.FieldValue.arrayRemove(email),
          LikeuserPhot:
            firebase.firestore.FieldValue.arrayRemove(LikeuserPhoto),
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          LikeBy: firebase.firestore.FieldValue.arrayUnion(likeuser),
          LikeByEmail: firebase.firestore.FieldValue.arrayUnion(email),
          LikeuserPhot: firebase.firestore.FieldValue.arrayUnion(LikeuserPhoto),
          // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
        });
    }
  }
  function formCotent(e) {
    e.preventDefault();
    setCommentContent(e.target.value);
    setuserMessage(e.target.value);
  }
  const isLike = post.LikeBy?.includes(
    firebase.auth().currentUser?.displayName
  );
  const LikebyPhoto = post.LikeuserPhot?.includes(
    firebase.auth().currentUser?.photoURL
  );
  const LikeByEmails = post.LikeByEmail?.includes(
    firebase.auth().currentUser?.email
  );
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${API_URL}/Rain0u0`,
        { userMessage },
        {
          withCredentials: true,
        }
      );

      const data = result.data;
      console.log("data", data);
    } catch (error) {
      console.log("404伺服器網址出現問題", error);
    }
    setIsLoading(true);
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection("posts").doc(postId);
    batch.update(postRef, {
      commentsCount: firebase.firestore.FieldValue.increment(1),
      // increment是firestore提供的增加1的function
    });

    const commentRef = postRef.collection("comments").doc();
    try {
      e.preventDefault();
      batch.set(commentRef, {
        content: commentContent,
        createdAt: firebase.firestore.Timestamp.now(),
        auther: {
          uid: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName || "",
          photoURL: firebase.auth().currentUser.photoURL || "",
        },
      });
    } catch (error) {
      console.log(error);
    }

    await batch.commit().then(() => {
      setCommentContent("");
      setIsLoading(false);
    });
  }
  function GuestSubmit(e) {
    e.preventDefault();
    handleWarningComfirm(
      "你沒有登入",
      () => {
        navigate("/");
      },
      "所以不能按讚唷~點擊確認到首頁登入google吧!"
    );
  }
  function GuestInputSubmit(e) {
    e.preventDefault();
    handleWarningComfirm(
      "你沒有登入",
      () => {
        navigate("/");
      },
      "所以不能留言唷~點擊確認到首頁登入google吧!"
    );
  }
  function Collected(e) {
    e.preventDefault();
    handleWarningComfirm(
      "你沒有登入",
      () => {
        navigate("/");
      },
      "所以不能收藏唷~點擊確認到首頁登入google吧!"
    );
  }
  return (
    <>
      {usersLodaing === null ? (
        <>
          <div className="container postInfo custom-container ">
            <div className="row">
              <div className="col-12 d-flex article-info">
                <div className="col-6 my-auto">
                  <img className="w-100 " src={post.imageUrl} alt="" />
                </div>
                <div className="col-6 p-3">
                  <div className="container ">
                    <div className="row d-flex border-bottom">
                      {post.author?.photoURL ? (
                        <div className="col-2 article-other_userPhoto">
                          <img src={post.author.photoURL} alt="" />
                        </div>
                      ) : (
                        <FaUserCircle />
                      )}
                      <div className="col-10">
                        <p className="article-name">
                          {post.author?.displayName || "使用者"}
                        </p>
                      </div>
                    </div>

                    <div className="row mt-3 border-bottom">
                      <div className="col-2 my-auto ">
                        {post.author?.photoURL ? (
                          <div className="article-other_userPhoto">
                            <img src={post.author.photoURL} alt="" />
                          </div>
                        ) : (
                          <FaUserCircle />
                        )}
                      </div>
                      <div className="col-10">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                      </div>
                    </div>

                    <div className="comments_container">
                      {comments.map?.((comment) => {
                        return (
                          <div className="row my-3 " key={comment.createdAt}>
                            <div className="col-2 article-other_userPhoto">
                              {comment.author?.photoURL ? (
                                <FaUserCircle />
                              ) : (
                                <img
                                  className=""
                                  src={comment?.auther?.photoURL}
                                  alt="123"
                                />
                              )}
                            </div>
                            <div className="col-10 my-auto">
                              <span className="pe-3">
                                {comment.auther.displayName || "使用者"}
                              </span>
                              {comment.content || ""}
                              <br />
                              {comment.createdAt.toDate().toLocaleString() ||
                                ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-top"></div>
                    <div className="p-2">
                      <div className="d-flex mb-2">
                        <div
                          className="isLikes_icon mx-3 mt-1"
                          onClick={GuestSubmit}
                        >
                          {isLike ? <FcLike /> : <FcLikePlaceholder />}
                        </div>
                        <div
                          className="isCollected mx-3 mt-1 "
                          onClick={Collected}
                        >
                          {isCollected ? <BsBookmarkFill /> : <BsBookmark />}
                        </div>
                      </div>
                      <div className="my-1">{post.LikeBy?.length || 0}個讚</div>
                      <p className="my-1">
                        {post.LikeBy?.[0]}
                        <span>和其他人都說讚</span>
                        <br />
                      </p>
                      <p className="my-1">
                        {post.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>

                    <div className="container">
                      <div className="row">
                        <form onSubmit={GuestInputSubmit}>
                          <input
                            // value={commentContent}
                            // onChange={formCotent}
                            className="comment-Content "
                            cols="30"
                            rows="5"
                          ></input>
                          <button
                            className={
                              isLoading
                                ? "btn btn-waring m-5 text-light"
                                : // 記得做一個lodaing的特效
                                  "btn btn-info  text-start"
                            }
                          >
                            留言
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container postInfo custom-container ">
            <div className="row">
              <div className="col-12 d-flex article-info">
                <div className="col-6 my-auto">
                  <img className="w-100 " src={post.imageUrl} alt="" />
                </div>
                <div className="col-6 p-3">
                  <div className="container ">
                    <div className="row d-flex border-bottom">
                      {post.author?.photoURL ? (
                        <div className="col-2 article-other_userPhoto">
                          <img src={post.author.photoURL} alt="" />
                        </div>
                      ) : (
                        <FaUserCircle />
                      )}
                      <div className="col-10">
                        <p className="article-name">
                          {post.author?.displayName || "使用者"}
                        </p>
                      </div>
                    </div>

                    <div className="row mt-3 border-bottom">
                      <div className="col-2 my-auto ">
                        {post.author?.photoURL ? (
                          <div className="article-other_userPhoto">
                            <img src={post.author.photoURL} alt="" />
                          </div>
                        ) : (
                          <FaUserCircle />
                        )}
                      </div>
                      <div className="col-10">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                      </div>
                    </div>

                    <div className="comments_container">
                      {comments.map?.((comment) => {
                        return (
                          <div className="row my-3 " key={comment.createdAt}>
                            <div className="col-2 article-other_userPhoto">
                              {comment.author?.photoURL ? (
                                <FaUserCircle />
                              ) : (
                                <img
                                  className=""
                                  src={comment?.auther?.photoURL}
                                  alt="123"
                                />
                              )}
                            </div>
                            <div className="col-10 my-auto">
                              <span className="pe-3">
                                {comment.auther.displayName || "使用者"}
                              </span>
                              {comment.content || ""}
                              <br />
                              {comment.createdAt.toDate().toLocaleString() ||
                                ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-top"></div>
                    <div className="p-2">
                      <div className="d-flex mb-2">
                        {/* 留言 {post.commentsCount || 0} */}
                        <div
                          className="isLikes_icon mx-3 mt-1"
                          onClick={toggleLiked}
                        >
                          {isLike ? <FcLike /> : <FcLikePlaceholder />}
                        </div>
                        <div
                          className="isCollected mx-3 mt-1 "
                          onClick={toggleCollected}
                        >
                          {isCollected ? <BsBookmarkFill /> : <BsBookmark />}
                        </div>
                      </div>
                      <div className="my-1">{post.LikeBy?.length || 0}個讚</div>
                      <p className="my-1">
                        {post.LikeBy?.[0]}
                        <span>和其他人都說讚</span>
                        <br />
                      </p>
                      <p className="my-1">
                        {post.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>

                    <div className="container">
                      <div className="row">
                        <form onSubmit={onSubmit}>
                          <input
                            value={commentContent}
                            onChange={formCotent}
                            className="comment-Content "
                            cols="30"
                            rows="5"
                          ></input>
                          <button
                            className={
                              isLoading
                                ? "btn btn-waring m-5 text-light"
                                : // 記得做一個lodaing的特效
                                  "btn btn-info  text-start"
                            }
                          >
                            留言
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostInfo;
