import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const words = ["Build", "Market", "Scale"];
const gradients = [
  "linear-gradient(90deg, #38b6ff 0%, #185a9d 100%)",
  "linear-gradient(90deg,rgb(40, 229, 144) 0%,rgb(106, 229, 40) 100%)",
  "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
];

const pulse = {
  animate: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const Header = (props) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (visibleCount < words.length) {
      const timeout = setTimeout(() => {
        setVisibleCount(visibleCount + 1);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleCount(1);
        setCycle((c) => c + 1);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, cycle]);

  const fontSize = "clamp(3.5rem, 15vw, 8rem)";

  return (
    <header
      id="header"
      role="banner"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        className="intro"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.77vh",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/R3Ia8XS_cTk?autoplay=1&mute=1&loop=1&playlist=R3Ia8XS_cTk&controls=0&showinfo=0&autohide=1&modestbranding=1&playsinline=1&rel=0&fs=0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              border: "none",
            }}
            title="YouTube video background"
          />
        </div>
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Social Media Icons Row */}
          <div
            className="social-icons-row"
            style={{
              position: "absolute",
              top: 120,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 28,
              zIndex: 3,
              pointerEvents: "auto",
            }}
          >
            <motion.a
              href="https://www.instagram.com/taipreneur/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E1306C", fontSize: 36 }}
              variants={pulse}
              animate="animate"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@taipreneur"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FF0000",
                fontSize: 36,
                filter: "drop-shadow(0 2px 8px #0003)",
              }}
              variants={pulse}
              animate="animate"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/taipreneur/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#0077B5",
                fontSize: 36,
                filter: "drop-shadow(0 2px 8px #0003)",
              }}
              variants={pulse}
              animate="animate"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://x.com/taipreneur"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1DA1F2",
                fontSize: 36,
                filter: "drop-shadow(0 2px 8px #0003)",
              }}
              variants={pulse}
              animate="animate"
            >
              <FaXTwitter />
            </motion.a>
            <motion.a
              href="https://wa.me/918084630858"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#25D366",
                fontSize: 36,
                filter: "drop-shadow(0 2px 8px #0003)",
              }}
              variants={pulse}
              animate="animate"
            >
              <FaWhatsapp />
            </motion.a>
          </div>
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <div
              className="row"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="intro-text"
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.1em",
                    minHeight: "40vh",
                  }}
                >
                  {/* SEO H1 */}
                  <h1
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "1px",
                      height: "1px",
                      padding: "0",
                      margin: "0",
                      overflow: "hidden",
                      clip: "rect(0, 0, 0, 0)",
                      whiteSpace: "nowrap",
                      border: "0",
                      fontSize: "1px",
                      color: "transparent",
                      zIndex: "-1",
                    }}
                  >
                    Taipreneur Agency - Digital Marketing, Web & App
                    Development, Business Growth
                  </h1>

                  {/* Visual animated words */}
                  <div className="visual-heading">
                    {words.slice(0, visibleCount).map((word, idx) => (
                      <div
                        key={word + idx + cycle}
                        style={{
                          fontSize,
                          fontWeight: 900,
                          background: gradients[idx % gradients.length],
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textFillColor: "transparent",
                          letterSpacing: "2px",
                          margin: 0,
                          padding: 0,
                          lineHeight: 1.1,
                          textShadow: "0 4px 32px rgba(0,0,0,0.25)",
                          transition:
                            "font-size 0.4s cubic-bezier(.4,2,.6,1)",
                          opacity: 1,
                          animation: "fadeIn 0.5s",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        {word}
                      </div>
                    ))}
                  </div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                      maxWidth: 650,
                      marginTop: 20,
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    {props.data
                      ? props.data.paragraph
                      : "Full-stack development, digital marketing, and business automation — we help brands grow from idea to impact."}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.a
                    href="#services"
                    className="page-scroll"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "inline-block",
                      marginTop: 28,
                      padding: "14px 36px",
                      background: "linear-gradient(90deg, #38b6ff 0%, #185a9d 100%)",
                      color: "#fff",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 50,
                      textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(56,182,255,0.4)",
                      border: "2px solid rgba(255,255,255,0.3)",
                      letterSpacing: 0.5,
                    }}
                  >
                    Explore Our Services
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EzoicAds Placement - Header Banner */}
        <div
          id="ezoic-pub-ad-placeholder-101"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
          }}
        ></div>
        <script>
          {`
            if (window.ezstandalone) {
              window.ezstandalone.cmd.push(function () {
                window.ezstandalone.showAds(101);
              });
            }
          `}
        </script>
      </div>
      <style>
        {`
          @media (min-width: 768px) and (max-width: 1024px) {
            .social-icons-row {
              top: 180px !important;
            }
          }
        `}
      </style>
    </header>
  );
};
