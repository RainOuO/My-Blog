import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { Waypoint } from 'react-waypoint';
import Modal from 'react-bootstrap/Modal';
import WhoLikesUser from '../WhoLikesUser/WhoLikesUser';
import firebase from '../../utils/firebase';
import 'firebase/compat/storage';
// import ChatPage from '../../components/ChatPage/ChatPage';
import { handleWarningComfirm } from '../../utils/handler/handleStatusCard';
import photo_backgroung from '../../images/photo_backgroung.jpg';
import Chatbot from '../Chatbot/Chatbot';
import './_Post.scss';
import AuthContext from '../../hooks/auth-context';
const Post = () => {
  const contextData = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [Likecancel, setLikeCancel] = useState(false);
  const [postLikeID, setPostLikeID] = useState('');
  const [wholikes, setWhoLikes] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const lastPostSnapshotRef = useRef();
  const userLikes = firebase.auth().currentUser?.displayName;
  //第一次撈資料的useEffect
  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(4)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);

  //fetchPosts是每次滑動時更多資訊出現
  // 使用useCallback優化每次的function 只有contextData狀態改變才會執行此useCallback
  const fetchPosts = useCallback(() => {
    firebase
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(4)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        lastPostSnapshotRef.current =
          collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
        setPosts(data);
        contextData.setNewPosts(false);
      });
  }, [contextData]);
  const newPostHandler = contextData.newPost;
  // 使用useMemo 把context的newPost狀態優化 不會每次更改就render
  const memoizedNewPostHandler = useMemo(
    () => newPostHandler,
    [newPostHandler]
  );
  const memoizedFetchPosts = useMemo(() => fetchPosts, [fetchPosts]);
  useEffect(() => {
    memoizedFetchPosts();
  }, [Likecancel, memoizedFetchPosts]);
  //只有一發表文章newPost狀態會變成true 就會重新render撈firebase資料渲染畫面 原先是fasle 發文後會變成ture
  useEffect(() => {
    if (memoizedNewPostHandler) {
      fetchPosts();
      contextData.setNewPosts(false);
    }
  }, [contextData, fetchPosts, memoizedNewPostHandler]);

  //使用useCallback 只有誰點讚或是post頁面任何狀態改變時才會執行此函數
  const handleLike = useCallback(
    async (postId) => {
      let WhoLikesID = posts.filter((v) => v.id.includes(postId));
      const whoLikesFilter = WhoLikesID[0]?.LikeBy.filter(
        (e) => e === userLikes || ''
      );
      const toogleLike = whoLikesFilter?.includes(userLikes);
      const postRef = firebase.firestore().collection('posts').doc(postId);
      const email = firebase.auth().currentUser.email;
      const likeuserPhoto = firebase.auth().currentUser.photoURL;
      if (toogleLike) {
        await postRef.update({
          LikeBy: firebase.firestore.FieldValue.arrayRemove(userLikes),
          LikeByEmail: firebase.firestore.FieldValue.arrayRemove(email),
          LikeuserPhot:
            firebase.firestore.FieldValue.arrayRemove(likeuserPhoto),
        });
        setWhoLikes((prev) => {
          const newState = [...prev];
          newState[postId] = false;
          return newState;
        });
      } else {
        await postRef.update({
          LikeBy: firebase.firestore.FieldValue.arrayUnion(userLikes),
          LikeByEmail: firebase.firestore.FieldValue.arrayUnion(email),
          LikeuserPhot: firebase.firestore.FieldValue.arrayUnion(likeuserPhoto),
        });
        setWhoLikes((prev) => {
          const newState = [...prev];
          newState[postId] = true;
          return newState;
        });
      }
    },
    [posts, userLikes]
  );
  useEffect(() => {
    setWhoLikes(posts.map((e) => e.LikeBy.includes(userLikes)));
  }, [posts, userLikes]);

  const commentID = posts.map((e) => e.id);
  const newComment = commentID.filter((id) => id === postLikeID);
  const postListID = posts.filter((post) => post.id === newComment[0]);
  function GuestSubmit() {
    handleWarningComfirm(
      '你沒有登入',
      () => {
        navigate('/');
      },
      '所以不能按讚唷~點擊確認到首頁登入google吧!'
    );
  }
  const handleLikeClick = useCallback(() => {
    setLikeCancel((prevState) => !prevState);
  }, []);
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
          {posts !== '' ? (
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
                      <div>
                        <div className="row ">
                          <div className="col-lg-3 d-flex col-md-4">
                            {contextData.usersLodaing === null ? (
                              <>
                                <span
                                  className="heart"
                                  onClick={() => {
                                    GuestSubmit();
                                  }}
                                >
                                  {wholikes[index] !== false ? (
                                    <FcLike size={20} />
                                  ) : (
                                    <FcLikePlaceholder size={20} />
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  className="heart"
                                  onClick={() => {
                                    handleLike(post.id);
                                  }}
                                >
                                  {wholikes[index] ? (
                                    <FcLike
                                      size={20}
                                      onClick={handleLikeClick}
                                    />
                                  ) : (
                                    <FcLikePlaceholder
                                      size={20}
                                      onClick={handleLikeClick}
                                    />
                                  )}
                                </span>
                              </>
                            )}
                            <p>{post.LikeBy?.[0] || '0'}</p>
                          </div>
                          <div
                            className=" d-inline otherLikes col-lg-7 col-md-6"
                            onClick={() => {
                              handleShow();
                              setPostLikeID(post.id);
                            }}
                          >
                            {post.LikeBy === '' ? (
                              <span></span>
                            ) : post.LikeBy.length > 1 ? (
                              <span>
                                和其他
                                {post.LikeBy?.length - 1 || ''}人都說讚
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </div>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className="text-center">
                              <Modal.Title>說讚的用戶</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="row">
                                <div className="col-12">
                                  <WhoLikesUser
                                    postListWhoLikeID={postListID}
                                  />
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </div>
                      </div>
                      <div className="post_description">
                        <span className="pe-3">
                          {post.author?.displayName || '使用者'}
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
              <div style={{ height: '80vh' }}>
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
              .collection('posts')
              .orderBy('createdAt', 'desc')
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
