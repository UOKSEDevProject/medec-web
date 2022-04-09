import React from "react";
import logo from "../../assets/images/image-footerLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-top '>
        <div className='footer-center col-lg-6'>
          <p>©2021 CODEPIRATEZ</p>
        </div>
        <div className='footer-center col-lg-6'>
          <img src={logo} alt={"medec"} />
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='col-lg-4 footer-navlink footer-link'>
          <a href='#'>Home</a>
          <a href='#'>About</a>
          <a href='#'>Contact</a>
        </div>
        <div className='col-lg-4'></div>
        <div className='col-lg-4 footer-social-media footer-link'>
          <a href='#'>
            <FontAwesomeIcon icon={faFacebook} size='1x' color='black' />
          </a>
          <a href='#'>
            <FontAwesomeIcon icon={faTwitter} size='1x' color='black' />
          </a>
          <a href='#'>
            <FontAwesomeIcon icon={faYoutube} size='1x' color='black' />
          </a>
          <a href='#'>
            <FontAwesomeIcon icon={faInstagram} size='1x' color='black' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
