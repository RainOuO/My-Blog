import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import firebase from '../../utils/firebase';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';
// import { BsBookmark } from 'react-icons/bs';
// import { BsBookmarkFill } from 'react-icons/bs';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import 'firebase/compat/storage';
import './_PostInfo.scss';
import Chatbot from '../Chatbot/Chatbot';
import { handleWarningComfirm } from '../../utils/handler/handleStatusCard';
import AuthContext from '../../hooks/auth-context';
const API_URL = process.env.REACT_APP_OPEN_URL;
const PostInfo = () => {
  const contextData = useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({ auther: {} });
  const [commentContent, setCommentContent] = useState('');
  const [userMessage, setuserMessage] = useState({});
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      // onSnapshot 更新狀態監聽功能意思 只要postId值有改變 會更新Firestore資料 會馬上取得最新狀態
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        setPost(data);
      });
  }, [postId]);
  // 處理留言狀態開始
  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      // 可以做一個選擇留言順序 更新desc
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setComments(data);
      });
  }, [postId]);
  // async function toggleCollected() {
  //   const uid = firebase.auth().currentUser.uid;

  //   if (isCollected) {
  //     firebase
  //       .firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .update({
  //         collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
  //         // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
  //       });
  //   } else {
  //     firebase
  //       .firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .update({
  //         collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
  //         // arrayUnion 是把陣列加進去 不管怎樣舊的值都不會被取代
  //       });
  //   }
  // }
  // const isCollected = post.collectedBy?.includes(
  //   firebase.auth().currentUser?.uid
  // );
  function toggleLiked() {
    const email = firebase.auth().currentUser.email;
    const LikeuserPhoto = firebase.auth().currentUser.photoURL;
    const likeuser = firebase.auth().currentUser.displayName;
    if ((isLike, LikeByEmails, LikebyPhoto)) {
      firebase
        .firestore()
        .collection('posts')
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
        .collection('posts')
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
    if (commentContent === '') {
      return;
    }
    setIsLoading(true);
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection('posts').doc(postId);
    batch.update(postRef, {
      commentsCount: firebase.firestore.FieldValue.increment(1),
      // increment是firestore提供的增加1的function
    });
    const commentRef = postRef.collection('comments').doc();
    try {
      e.preventDefault();
      batch.set(commentRef, {
        content: commentContent,
        createdAt: firebase.firestore.Timestamp.now(),
        auther: {
          uid: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName || '',
          photoURL: firebase.auth().currentUser.photoURL || '',
        },
      });
      console.log('batch==================', batch);
    } catch (error) {
      console.log(error);
    }
    await batch.commit().then(() => {
      setCommentContent('');
      setIsLoading(false);
    });
    try {
      const result = await axios.post(
        `${API_URL}/Rain0u0`,
        { userMessage },
        {
          withCredentials: true,
        }
      );
      const data = result.data;
      console.log('data', data);
    } catch (error) {
      console.log('404伺服器網址出現問題', error);
    }
  }
  function GuestSubmit(e) {
    e.preventDefault();
    handleWarningComfirm(
      '你沒有登入',
      () => {
        navigate('/');
      },
      '所以不能按讚唷~點擊確認到首頁登入google吧!'
    );
  }
  function GuestInputSubmit(e) {
    e.preventDefault();
    handleWarningComfirm(
      '你沒有登入',
      () => {
        navigate('/');
      },
      '所以不能留言唷~點擊確認到首頁登入google吧!'
    );
  }
  // function Collected(e) {
  //   e.preventDefault();
  //   handleWarningComfirm(
  //     '你沒有登入',
  //     () => {
  //       navigate('/');
  //     },
  //     '所以不能收藏唷~點擊確認到首頁登入google吧!'
  //   );
  // }
  let usersLodaing = contextData.usersLodaing;
  console.log('usersLodaing', usersLodaing);
  return (
    <>
      <Chatbot />
      {usersLodaing === null ? (
        <>
          <div className="boxheight"></div>
          <div className="postheader text-center">
            <div className="article-headerPhoto">
              <img className="" src={post.imageUrl} alt="" />
            </div>
            <div className="mb-3 postheader_title">
              <h2>{post.title}</h2>
            </div>
            <div>
              <p>
                {post.createdAt?.toDate().toLocaleDateString()} /{' '}
                {post.author?.displayName || '使用者'}
              </p>
            </div>
          </div>
          <div className="container postInfo mt-1 custom-container ">
            <div className="row">
              <div className="col-12  article-info mb-5">
                {/* <div className="col-12 my-auto article-headerPhoto">
                  <img className="" src={post.imageUrl} alt="" />
                </div> */}
                <div className="col-12 p-3 mt-2">
                  <div>
                    <div className="row mt-md-5 mt-3">
                      <div className="col-10">
                        <p>{post.content}</p>
                        <div
                          dangerouslySetInnerHTML={{ __html: post.markdown }}
                        >
                          {/* post是我撈出來的api . markdown是我存到資料庫的名稱 */}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 ">
                      <div className="my-1  d-md-flex justify-content-between align-items-center">
                        <div className="col-xxl-3 col-md-4">
                          <span>{post.LikeBy?.length || ''}個讚</span>
                          <span className="my-1 ms-5">
                            {post.LikeBy === '' ? (
                              <span></span>
                            ) : post.LikeBy?.length > 1 ? (
                              <span>
                                和其他
                                {post.LikeBy?.length - 1 || ''}人都說讚
                              </span>
                            ) : (
                              <span></span>
                            )}
                            <br />
                          </span>
                        </div>

                        <div className="d-flex mb-2 ">
                          {/* 留言 {post.commentsCount || 0} */}
                          <div
                            // className="isLikes_icon mx-3 mt-1"
                            className="postinfo_heart"
                            onClick={GuestSubmit}
                          >
                            {isLike ? <FcLike /> : <FcLikePlaceholder />}
                          </div>
                          {/* <div
                            className="isCollected mx-3 mt-1 "
                            onClick={Collected}
                          >
                            {isCollected ? <BsBookmarkFill /> : <BsBookmark />}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="container mt-3">
                      <div className="row">
                        <div className="col-2 article-other_userPhoto">
                          {post.author?.photoURL ? (
                            <FaUserCircle />
                          ) : (
                            <img
                              className=""
                              src={post?.auther?.photoURL}
                              alt="123"
                            />
                          )}
                        </div>
                        <form onSubmit={GuestInputSubmit} className="col-10">
                          <input
                            value={commentContent}
                            onChange={formCotent}
                            className="comment-Content "
                            cols="30"
                            rows="5"
                            placeholder="留下點什麼"
                          ></input>
                          <button
                            className={
                              isLoading
                                ? 'btn btn-waring m-5 text-light'
                                : // 記得做一個lodaing的特效
                                  'btn btn-info  text-start'
                            }
                          >
                            留言
                          </button>
                        </form>
                      </div>
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
                              {comment.auther.displayName || '使用者'}
                            </span>
                            {comment.content || ''}
                            <br />
                            {comment.createdAt.toDate().toLocaleString() || ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-top"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="boxheight"></div>
          <div className="postheader text-center">
            <div className="article-headerPhoto">
              <img className="" src={post.imageUrl} alt="" />
            </div>
            <div className="mb-3 postheader_title">
              <h2>{post.title}</h2>
            </div>
            <div>
              <p>
                {post.createdAt?.toDate().toLocaleDateString()} /{' '}
                {post.author?.displayName || '使用者'}
              </p>
            </div>
          </div>
          <div className="container postInfo mt-1 custom-container ">
            <div className="row">
              <div className="col-12  article-info mb-5">
                {/* <div className="col-12 my-auto article-headerPhoto">
                  <img className="" src={post.imageUrl} alt="" />
                </div> */}
                <div className="col-12 p-3 mt-2">
                  <div>
                    <div className="row mt-md-5 mt-3">
                      <div className="col-10">
                        <p>{post.content}</p>
                        <div
                          dangerouslySetInnerHTML={{ __html: post.markdown }}
                        >
                          {/* post是我撈出來的api . markdown是我存到資料庫的名稱 */}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 ">
                      <div className="my-1  d-md-flex justify-content-between align-items-center">
                        <div className="col-xxl-3 col-md-4 ">
                          <span>{post.LikeBy?.length || 0}個讚</span>
                          <span className="my-1 ms-5">
                            {post.LikeBy === '' ? (
                              <span></span>
                            ) : post.LikeBy?.length > 1 ? (
                              <span>
                                和其他
                                {post.LikeBy?.length - 1 || ''}人都說讚
                              </span>
                            ) : (
                              <span></span>
                            )}
                            <br />
                          </span>
                        </div>

                        <div className="d-flex mb-2 ">
                          {/* 留言 {post.commentsCount || 0} */}
                          <div
                            // className="isLikes_icon mx-3 mt-1"
                            className="postinfo_heart"
                            onClick={toggleLiked}
                          >
                            {isLike ? <FcLike /> : <FcLikePlaceholder />}
                          </div>
                          {/* <div
                            className="isCollected mx-3 mt-1 "
                            // className="heart"
                            onClick={toggleCollected}
                          >
                            {isCollected ? <BsBookmarkFill /> : <BsBookmark />}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="container mt-3">
                      <div className="row">
                        <div className="col-2 article-other_userPhoto">
                          {post.author?.photoURL ? (
                            <FaUserCircle />
                          ) : (
                            <img
                              className=""
                              src={post?.auther?.photoURL}
                              alt="123"
                            />
                          )}
                        </div>
                        <form onSubmit={onSubmit} className="col-10">
                          <input
                            value={commentContent}
                            onChange={formCotent}
                            className="comment-Content "
                            cols="30"
                            rows="5"
                            placeholder="留下點什麼"
                          ></input>
                          <button
                            className={
                              isLoading
                                ? 'btn btn-waring m-5 text-light'
                                : // 記得做一個lodaing的特效
                                  'btn btn-info  text-start'
                            }
                          >
                            留言
                          </button>
                        </form>
                      </div>
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
                              {comment.auther.displayName || '使用者'}
                            </span>
                            {comment.content || ''}
                            <br />
                            {comment.createdAt.toDate().toLocaleString() || ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-top"></div>
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
