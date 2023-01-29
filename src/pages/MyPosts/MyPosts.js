import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/compat/storage";
const MyPosts = () => {
  const [post, setPost] = useState([]);
  console.log("post", post);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("author.uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((col) => {
        const data = col.docs.map((docsnapshot) => {
          const id = docsnapshot.id;
          return { ...docsnapshot.data(), id };
        });
        setPost(data);
      });
  }, []);
  return <div>MyPosts</div>;
};

export default MyPosts;
