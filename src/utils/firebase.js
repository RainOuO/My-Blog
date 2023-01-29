import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBAYvmWyBY3qhqRuDrGQTZr_DNOb6_K7_w",
  authDomain: "social-blog-4b1c8.firebaseapp.com",
  projectId: "social-blog-4b1c8",
  storageBucket: "social-blog-4b1c8.appspot.com",
  messagingSenderId: "544254749531",
  appId: "1:544254749531:web:2f01eeb96a3a0d3a5f087e",
};

firebase.initializeApp(firebaseConfig);
export default firebase;

// import { initializeApp } from "firebase/compat/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBAYvmWyBY3qhqRuDrGQTZr_DNOb6_K7_w",
//   authDomain: "social-blog-4b1c8.firebaseapp.com",
//   projectId: "social-blog-4b1c8",
//   storageBucket: "social-blog-4b1c8.appspot.com",
//   messagingSenderId: "544254749531",
//   appId: "1:544254749531:web:2f01eeb96a3a0d3a5f087e",
// };

// const app = initializeApp(firebaseConfig);
// // firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
