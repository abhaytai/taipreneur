import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const skillItem = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export const About = (props) => {
  return (
    <div id="about" style={{ paddingTop: "30px" }}>
      <div className="container">
        <div className="row">
          {/* 🔽 Text First on Mobile, Left Side on Desktop */}
          <motion.div
            className="col-xs-12 col-md-6 order-md-1 order-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="about-text">
              <h2
                style={{
                  marginTop: "10px",
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#185a9d",
                }}
              >
                About Taipreneur Agency - Your Full-Service Digital Partner
              </h2>
              {/* 🔽 Reduced top margin */}
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              {/* --- Professional Buttons Below Description --- */}
              <div className="about-btn-group">
                {/* 'Get Started' button links to WhatsApp */}
                <a
                  href="https://calendly.com/learnadam333d/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn primary"
                >
                  Book a Free Call
                </a>
                {/* 'See Our Projects' button links to portfolio */}
                <a href="/projects" className="about-btn secondary">
                  See Our Projects
                </a>
              </div>
              <h3>Our Core Services</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <motion.li
                            key={i}
                            custom={i}
                            variants={skillItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            style={{ listStyle: "none" }}
                          >
                            {d}
                          </motion.li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 🔽 Image Second on Mobile, Right Side on Desktop */}
          <motion.div
            className="col-xs-12 col-md-6 order-md-2 order-1"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #0b1f3a 0%, #185a9d 100%)",
                borderRadius: 16,
                padding: "40px 28px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: 1 }}>
                <span style={{ color: "#ff4d4d" }}>TAI</span>
                <span style={{ color: "#38b6ff" }}>PRENEUR</span>
              </div>
              <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,0.88)", fontSize: "1.1rem" }}>
                Websites &middot; Digital Marketing &middot; AI Automation &middot; SEO &middot; GEO &middot; AEO
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* EzoicAds Placement - About Section In-Content */}
        <div id="ezoic-pub-ad-placeholder-102" style={{ margin: '2rem 0', textAlign: 'center' }}></div>
        <script>
          {`
            if (window.ezstandalone) {
              window.ezstandalone.cmd.push(function () {
                window.ezstandalone.showAds(102);
              });
            }
          `}
        </script>
      </div>
      <style>
        {`
          .about-btn-group {
            display: flex;
            gap: 1.5rem;
            justify-content: flex-start;
            margin: 2rem 0 2rem 0;
          }
          .about-btn {
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background 0.3s, color 0.3s, box-shadow 0.3s;
            box-shadow: 0 2px 12px rgba(56,182,255,0.08);
          }
          .about-btn.primary {
            background: linear-gradient(90deg, #38b6ff 0%, #185a9d 100%);
            color: #fff;
          }
          .about-btn.primary:hover {
            background: linear-gradient(90deg, #185a9d 0%, #38b6ff 100%);
            color: #fff;
          }
          .about-btn.secondary {
            background: #fff;
            color: #185a9d;
            border: 2px solid #38b6ff;
          }
          .about-btn.secondary:hover {
            background: #38b6ff;
            color: #fff;
            border: 2px solid #185a9d;
          }
        `}
      </style>
    </div>
  );
};
