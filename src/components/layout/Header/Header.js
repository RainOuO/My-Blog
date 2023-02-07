import { FaUser } from "react-icons/fa";
import firebase from "../../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import "./_Header.scss";
import { useEffect, useState } from "react";
import NewPosts from "../../../pages/NewPosts";
import { handleWarningComfirm } from "../../../utils/handler/handleStatusCard";
import Modal from "react-bootstrap/Modal";
import logoPhoto from "../../../images/logo3.png";

const Header = ({ usersLodaing }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  function logout() {
    handleWarningComfirm(
      "是否登出?",
      () => {
        firebase.auth().signOut();
        navigate("/");
      },
      "歡迎再次登入來留言互動!"
    );
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
              <div className="header_logo">
                <img src={logoPhoto} alt="" />
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-3 col-6 ">
            <ul className="d-flex my-auto">
              <Link to="/Post" className="">
                <li className="mx-xl-5 mx-md-4 mx-2">Post</li>
              </Link>
              <Link to="/AboutMe" className="">
                <li className="mx-xl-5 mx-md-4 mx-2">About</li>
              </Link>
              <Link to="#" className="">
                <li className="mx-xl-5 mx-md-4 mx-2">Anything</li>
              </Link>
              <Link to="#" className="">
                <li className="mx-xl-5 mx-md-4 mx-2">Portfolio</li>
              </Link>
            </ul>
          </div>
          <div className="col-xxl-4 col-xl-6 col-5 ">
            <div className="d-flex  header_Icon align-items-center justify-content-md-end ps-md-5">
              {user ? (
                <>
                  <div className="">
                    <p
                      className="post_article pe-3 my-auto"
                      onClick={handleShow}
                    >
                      發表文章
                    </p>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      className="custom_modal"
                    >
                      <Modal.Header closeButton className="text-center">
                        <Modal.Title>發表文章</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row">
                          <div className="col-12">
                            <NewPosts setShow={setShow} />
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
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
                    <Link className="ps-md-3 my-auto" onClick={logout}>
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
