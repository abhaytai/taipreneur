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
              <h1
                style={{
                  marginTop: "10px",
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#185a9d",
                }}
              >
                About Taipreneur Agency - Your Full-Service Digital Partner
              </h1>
              {/* 🔽 Reduced top margin */}
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              {/* --- Professional Buttons Below Description --- */}
              <div className="about-btn-group">
                {/* 'Get Started' button links to WhatsApp */}
                <a
                  href="https://wa.me/918084630858?text=Hi%20Taipreneur%20Agency!%20I%20am%20looking%20for%20some%20services%20for%20my%20business.%20I%20would%20appreciate%20your%20take%20on%20how%20you%20can%20help%20me%20grow%20my%20business%20with%20AI-powered%20solutions.%20Please%20let%20me%20know%20about%20your%20services%20and%20pricing.%20Thank%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn primary"
                >
                  Get Started
                </a>
                {/* 'View Portfolio' button links to portfolio */}
                <a href="#features" className="about-btn secondary">
                  View Portfolio
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
            <img
              src="img/abhay.jpeg"
              alt="Abhay"
              className="img-responsive"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                display: "block",
                marginTop: 0, // Ensures image is aligned closer
              }}
            />
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
