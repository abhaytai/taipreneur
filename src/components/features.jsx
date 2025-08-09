import React from "react";
import { motion } from "framer-motion";

export const Features = () => {
  const imgStyle = {
    width: 80,
    height: 80,
    borderRadius: "50%",
    border: "3px solid #38b6ff",
    objectFit: "cover",
    marginBottom: 16,
    background: "#fff",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  // Animation variant for cards
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  // Feature data (hardcoded)
  const features = [
    {
      img: "/img/ganapa.jpeg",
      title: "Ganapa Enterprises",
      desc: "Sales Man Intern",
    },
    {
      img: "/img/lesgo.png",
      title: "Lesgo",
      desc: "Social Media Marketing Intern",
    },
    {
      img: "/img/synkt.jpeg",
      title: "Synkerr",
      desc: "Product Lead",
    },
    {
      img: "/img/taipreneur.jpeg",
      title: "Taipreneur",
      desc: "Content Creator and Freelancer",
    },
  ];

  return (
    <div
      id="features"
      className="text-center"
      style={{ marginTop: "10px", marginBottom: "0px" }}
    >
      {/* Section Title inside container */}
      <div
        className="col-md-10 col-md-offset-1 section-title"
        style={{ marginBottom: "10px" }}
      >
        <h2>Experience</h2>
      </div>

      {/* 🔽 Full-Width Responsive Image Row */}
      <div
        style={{
          display: "flex",
          width: "100vw",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <img
          src="/img/AboutMain.jpeg"
          alt="Feature 1"
          style={{
            width: "50vw",
            height: "250px",
            objectFit: "cover",
            display: "block",
          }}
          className="img-left"
        />
        <img
          src="/img/Aboutpc.jpeg"
          alt="Feature 2"
          style={{
            width: "50vw",
            height: "250px",
            objectFit: "cover",
            display: "block",
          }}
          className="img-right"
        />
      </div>

      {/* 🔽 Feature Content inside container */}
      <div className="container">
        <div className="row" style={{ marginTop: "30px" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="col-xs-6 col-md-3"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              style={{ marginBottom: 32 }}
            >
              <img src={f.img} alt={f.title} style={imgStyle} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔽 Inline Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .img-left {
              width: 100vw !important;
            }
            .img-right {
              display: none !important;
            }
          }
          /* Responsive grid for features section */
          @media (max-width: 991px) {
            .row {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .col-xs-6.col-md-3 {
              width: 50%;
              max-width: 50%;
              flex: 0 0 50%;
              box-sizing: border-box;
              margin-bottom: 32px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
          @media (max-width: 430px) {
            .row {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .col-xs-6.col-md-3 {
              width: 50vw;
              max-width: 50vw;
              flex: 0 0 50vw;
              box-sizing: border-box;
              margin-bottom: 24px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
};
