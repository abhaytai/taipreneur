import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6"; // install react-icons if needed
import { motion } from "framer-motion";

const words = ["Eat", "Sleep", "Run", "Fun", "Business"];
const gradients = [
  "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)", // Eat
  "linear-gradient(90deg, #36d1c4 0%, #1e5799 100%)", // Sleep
  "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)", // Run
  "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)", // Fun
  "linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)", // Business
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

export const Header = () => {
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

  // Use a large, constant font size that is responsive but always big
  const fontSize = "clamp(3.5rem, 15vw, 8rem)";

  return (
    <header
      id="header"
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
            height: "56.25vw", // 16:9 aspect ratio
            minHeight: "100vh",
            minWidth: "177.77vh", // 16:9 aspect ratio
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/R3Ia8XS_cTk?autoplay=1&mute=1&loop=1&playlist=R3Ia8XS_cTk&controls=0&showinfo=0&autohide=1&modestbranding=1&playsinline=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Social Media Icons Row - now inside overlay, floating over video */}
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
                transition: "transform 0.2s",
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
                transition: "transform 0.2s",
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
                transition: "transform 0.2s",
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
                transition: "transform 0.2s",
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
                    gap: "0.3em",
                    minHeight: "40vh",
                  }}
                >
                  {words.slice(0, visibleCount).map((word, idx) => (
                    <span
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
                        transition: "font-size 0.4s cubic-bezier(.4,2,.6,1)",
                        opacity: 1,
                        animation: "fadeIn 0.5s",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          /* Increase top margin for social media icons on iPad */
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
