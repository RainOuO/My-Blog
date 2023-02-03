import React from "react";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import "./_Footer.scss";
import { Link } from "react-router-dom";
import coberight from "../../../images/footer_coberight.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="mt-3 footer-icon">
              <ul className="d-flex justify-content-center ">
                <a href="https://www.facebook.com/yucai.letter/">
                  <li className="mx-5 py-2">
                    <FiFacebook />
                  </li>
                </a>
                <a href="https://www.instagram.com/unique__0102/">
                  <li className="mx-5 py-2">
                    <AiOutlineInstagram />
                  </li>
                </a>
                <a href="https://github.com/RainOuO">
                  <li className="mx-5 py-2">
                    <AiFillGithub />
                  </li>
                </a>
              </ul>
            </nav>
          </div>
          <div className="col-12 copyright">
            <div className=" d-flex justify-content-center">
              <p>copyright©2023-Rain</p>
            </div>
            <div className="copyright_img">
              <img src={coberight} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
