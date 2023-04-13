import { FaUser } from 'react-icons/fa';
import firebase from '../../../utils/firebase';
import HomePaheHeader from '../../../pages/HomePageHeader/HomePageHeader';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './_Header.scss';
import { useEffect, useState } from 'react';
import NewPosts from '../../../pages/NewPosts';
import { handleWarningComfirm } from '../../../utils/handler/handleStatusCard';
import Modal from 'react-bootstrap/Modal';
import logoPhoto from '../../../images/logo3.png';

const Header = ({ newPost, setNewPosts }) => {
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
      '是否登出?',
      () => {
        firebase.auth().signOut();
        navigate('/');
      },
      '歡迎再次登入來留言互動!'
    );
  }
  const AuthBtn = () => {
    return (
      <div className="header_Icon_user my-auto">
        <FaUser />
      </div>
    );
  };
  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);
    useEffect(() => {
      let lastScrollY = window.pageYOffset;
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? 'down' : 'up';
        if (
          direction !== scrollDirection &&
          (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
        ) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener('scroll', updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener('scroll', updateScrollDirection); // clean up
      };
    }, [scrollDirection]);

    return scrollDirection;
  }
  const scrollDirection = useScrollDirection();
  return (
    <>
      <div
        className={`header_main_body ${
          scrollDirection === 'down' ? 'hide' : 'show'
        }`}
      >
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
              <ul className="d-flex my-auto header_hoverLink">
                <NavLink to="/Post">
                  <li className="mx-xl-5 mx-md-4 mx-2">Post</li>
                </NavLink>
                <NavLink to="/AboutMe">
                  <li className="mx-xl-5 mx-md-4 mx-2">About</li>
                </NavLink>
                <NavLink to="/404undefined">
                  <li className="mx-xl-5 mx-md-4 mx-2">Anything</li>
                </NavLink>
                <NavLink to="/404undefined">
                  <li className="mx-xl-5 mx-md-4 mx-2">Portfolio</li>
                </NavLink>
              </ul>
            </div>
            <div className="col-xxl-4 col-xl-6 col-5 ">
              <div className="d-flex  header_Icon align-items-center justify-content-md-end ps-md-5">
                {user ? (
                  <>
                    <div>
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
                              <NewPosts
                                setShow={setShow}
                                setNewPosts={setNewPosts}
                                newPost={newPost}
                              />
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>

                    <div className="user-picture my-auto">
                      <img
                        src={localStorage.getItem('profilePicture')}
                        alt=""
                      />
                    </div>
                    <div className=" d-flex">
                      <Link className=" ps-3">
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
      <div className="rwd_headerMenu">
        <HomePaheHeader />
      </div>
    </>
  );
};
export default Header;
