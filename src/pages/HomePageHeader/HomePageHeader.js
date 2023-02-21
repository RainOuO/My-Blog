import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./_HomePageHeader.scss";
import booksIcon from "../../images/book-svgrepo-com.svg";
const HomePaheHeader = () => {
  //滑鼠移出hover事件 更改State增加className
  const [active, setActive] = useState(false);
  const handleMouseOver = () => {
    setActive(true);
  };
  const handleMouseOut = () => {
    setActive(false);
  };
  return (
    <>
      <div
        className={active ? "homepage-header is-act" : "homepage-header"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="menu-drawer">
          <div className="menu-drawer__container">
            <ul className="menu-drawer__list c-text07 -thin">
              <li>
                <Link to="/Post" className="homepage-textlink-through">
                  <span>Post</span>
                </Link>
              </li>
              <li>
                <NavLink to="/AboutMe" className="homepage-textlink-through">
                  <span>About</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/404" className="homepage-textlink-through">
                  <span>Anything</span>
                </NavLink>
              </li>
              <li>
                <Link to="/404" className="homepage-textlink-through">
                  <span>Portfolio</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <button type="button" className="c-fluid homepage-header__button">
          <span className="u-relative">
            <div className="img">
              <span>
                <img alt="#" src={booksIcon} />
              </span>
              <span>
                <img alt="menu" src={booksIcon} />
              </span>
            </div>
            <span className="text u-center mt-4">menu</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default HomePaheHeader;
