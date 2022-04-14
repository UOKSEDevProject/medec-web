import React from "react";
import logo from "../../assets/images/image-footerLogo.png";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div className='footer-container'>
      <Container fluid={false}>
        <div className='footer-top '>
          <div className='footer-copyright col-lg-6'>
            <p>©2021 CODEPIRATEZ</p>
          </div>
          <div className='col-lg-6'>
            <img src={logo} alt={"medec"} />
          </div>
        </div>
        <hr />
        <div className='footer-bottom'>
          <div className='col-lg-4 footer-navlink footer-link'>
            <a href='#'>Home</a>
            <a href='#'>About</a>
            <a href='#'>Contact</a>
          </div>
          <div className='col-lg-4'></div>
          <div className='col-lg-4 footer-social-media footer-link'>
            <a href='#'>
              <FaFacebook color='black' size={"2rem"} />
            </a>
            <a href='#'>
              <FaLinkedin color='black' size={"2rem"} />
            </a>
            <a href='#'>
              <FaInstagram color='black' size={"2rem"} />
            </a>
            <a href='#'>
              <FaTwitter color='black' size={"2rem"} />
            </a>
          </div>
          <div className='footer-copyright col-lg-6'>
            <p> Powered by ©2021 CODEPIRATEZ</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
