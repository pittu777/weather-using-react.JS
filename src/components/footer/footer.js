import React from "react";
import "./footer.css"; // Make sure to adjust the path to your CSS file
import ContactForm from "./ContactForm";
import openLogo from "./images/logo-open.png";
import wind from "./images/wind.png";
import time from "./images/logo-time.png";
import "./../forecast/forecast.css";
import { FaFacebook, FaInstagram, FaTwitter, FaBug } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
        <div className="report-heading">
            <h3>Report</h3>
            <FaBug className="bug-icon" />
          </div>
          <ContactForm />
          <p>Email: weather777@gmail.com</p>
        </div>
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Add your social media icons and links here */}
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" />
            </a>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon" />
            </a>

            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="social-icon" />
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
        <div className="footer-section weather-icons">
          <h3>powered by</h3>
          <div className="footer-box">
            <p className="body-3">
              <a
                href="https://openweather.org/api"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src={openLogo}
                  alt=""
                  width={150}
                  height={30}
                  loading="lazy"
                />
              </a>
            </p>
            <p className="body-3">
              <a href="https://www.windy.com/" rel="noreferrer" target="_blank">
                <img src={wind} alt="" width={150} height={30} loading="lazy" />
              </a>
            </p>
            <p className="body-3">
              <a
                href="https://timezonedb.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={time} alt="" width={150} height={30} loading="lazy" />
              </a>
            </p>
          </div>
        </div>
        {/* Add more footer sections here */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 PITTU PRASANTH or PRAKASH,PRAVEEN,SIVA,NISHANTH. All rights reserved.</p>
        <p>Website designed and developed by my team and me</p>
      </div>
    </footer>
  );
};

export default Footer;
