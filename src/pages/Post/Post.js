import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";
import { BsBookmark } from "react-icons/bs";
import { FcLikePlaceholder } from "react-icons/fc";
import ChatPage from "../../components/ChatPage/ChatPage";

import photo_backgroung from "../../images/photo_backgroung.jpg";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "firebase/compat/storage";
import "./_Post.scss";

const Post = ({ socket }) => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("按讚人============", posts);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);
  return (
    <>
      <div className="container post custom-container">
        <div className="row">
          <ChatPage socket={socket} />
          <div className="col-12">
            <h2 className="text-center">
              Portfolio
              <br />
              Most recent works
            </h2>
            {posts !== "" ? (
              posts.map((post) => {
                return (
                  <div key={post.id} className="row">
                    <div className="col-12">
                      <Link to={`/postInfo/${post.id}`}>
                        <div className="w-100">
                          <img
                            className="photo"
                            src={
                              post.imageUrl ? post.imageUrl : photo_backgroung
                            }
                            alt=""
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 mb-5">
                      <div className="article mx-auto ">
                        <div className="">
                          <div className="row ">
                            <div className="col-3 d-flex">
                              <span className="pe-3 likeIcon">
                                <FcLikePlaceholder className="" />
                              </span>
                              <p>{post.LikeBy?.[0] || "0"}</p>
                            </div>

                            <div
                              className=" d-inline otherLikes col-7"
                              onClick={handleShow}
                            >
                              {post.LikeBy === [] ? (
                                <span>123</span>
                              ) : (
                                <span>
                                  和其他
                                  {post.LikeBy?.length || 0}人都說讚
                                </span>
                              )}
                            </div>
                            <div className="col-2 text-end pe-4">
                              <BsBookmark className="BsBookmark" />
                            </div>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton className="text-center">
                                <Modal.Title>說讚的用戶</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="row">
                                  <div className="col-2 otherLikes_photo">
                                    <img src={post.LikeuserPhot} alt="" />
                                  </div>
                                  <div className="col-10">
                                    <p>{post.LikeBy || "按讚人"}</p>
                                    <br />
                                    <p>{post.LikeByEmail || "email"}</p>
                                    <br />
                                  </div>
                                </div>
                              </Modal.Body>
                            </Modal>
                          </div>
                        </div>
                        <p>
                          <span className="pe-3">
                            {post.author?.displayName || "使用者"}
                          </span>
                          {post.title}
                        </p>
                        <Link to={`/postInfo/${post.id}`}>
                          <p>查看全部{post.commentsCount || 0}則留言</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div style={{ height: "80vh" }}>
                  <h1 className="text-center mt-5">網頁搜尋不到 請稍後</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
