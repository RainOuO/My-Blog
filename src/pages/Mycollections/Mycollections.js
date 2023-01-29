import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/compat/storage";
const Mycollections = () => {
  const [post, setPost] = useState([]);
  console.log("post", post);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("collectedBy", "array-contains", firebase.auth().currentUser.uid)
      .get()
      .then((col) => {
        const data = col.docs.map((docsnapshot) => {
          const id = docsnapshot.id;
          return { ...docsnapshot.data(), id };
        });
        setPost(data);
      });
  }, []);
  return <div>aaaaaaaaaaaaaaaaaaaaaa</div>;
};

export default Mycollections;
