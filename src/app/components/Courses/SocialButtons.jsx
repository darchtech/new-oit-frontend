import React from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import "../Courses/courses.css";

const SocialButtons = ({ contactInfo }) => {
  return (
    <div className="social-buttons-wrapper">
      <div className="social-buttons">
        {/* WhatsApp */}
        <a
          href="https://wa.me/9975708774"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn whatsapp"
        >
          <FaWhatsapp />
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/orangeitech/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn facebook"
        >
          <FaFacebookF />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/orangeitech/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn instagram"
        >
          <FaInstagram />
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/@Orangeitech"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn youtube"
        >
          <FaYoutube />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/orange-itech-intstitue/?originalSubdomain=in"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn linkedin"
        >
          <FaLinkedinIn />
        </a>

        {/* 📞 Call Button */}
        {contactInfo?.phones?.[0] && (
          <a
            href={`tel:${contactInfo.phones[0]}`}
            className="social-btn call"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
              alt="Call"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialButtons;
