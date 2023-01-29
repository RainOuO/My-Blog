import { FaUser } from "react-icons/fa";
import firebase from "../../../utils/firebase";
import { Link } from "react-router-dom";
import "./_Header.scss";
import { useEffect, useState } from "react";

const Header = ({ usersLodaing, guestLodaing, setguestLodaing }) => {
  console.log("usersLodaing狀態,", usersLodaing);
  console.log("guestLodaing狀態", guestLodaing);
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  function logout(e) {
    firebase.auth().signOut();
    setguestLodaing(null);
  }
  const AuthBtn = () => {
    return (
      <div className="header_Icon_user my-auto">
        <FaUser />
      </div>
    );
  };

  return (
    <div className="header_main_body fixed-top">
      <div className="header_main ">
        <div className="row d-flex align-items-center">
          <div className="col-xxl-4 col-xl-3 col-1">
            <Link to="/" className="header_menu">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-3 col-6 ">
            {usersLodaing || guestLodaing !== null || false ? (
              <ul className="d-flex my-auto">
                <li className="mx-xl-5 mx-md-4">
                  <Link to="/Post" className="">
                    Post
                  </Link>
                </li>
                <li className="mx-xl-5 mx-md-4">
                  <Link to="" className="">
                    About
                  </Link>
                </li>
                <li className="mx-xl-5 mx-md-4">
                  <Link to="" className="">
                    Skills
                  </Link>
                </li>
                <li className="mx-xl-5 mx-md-4">
                  <Link to="/PDF" className="">
                    Portfolio
                  </Link>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>
          <div className="col-xxl-4 col-xl-6 col-5 ">
            <div className="d-flex  header_Icon align-items-center justify-content-md-end ps-5">
              {user ? (
                <>
                  <div className="">
                    <Link className="pe-3 my-auto" to="/new-post">
                      發表文章
                    </Link>
                  </div>

                  <div className="user-picture my-auto">
                    <img src={localStorage.getItem("profilePicture")} alt="" />
                  </div>
                  <div className=" d-flex">
                    <Link className=" ps-3" to="/MyMenu">
                      <AuthBtn></AuthBtn>
                    </Link>
                  </div>
                  <div className="">
                    <Link className="ps-3 my-auto" onClick={logout}>
                      登出
                    </Link>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
