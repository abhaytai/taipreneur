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
    { title: "RPH College", desc: "SEO, GEO & AEO improvement and digital marketing", url: "/projects" },
    { title: "Anna Leela College", desc: "SEO, GEO & AEO improvement and digital marketing", url: "/projects" },
    { title: "UKS College", desc: "SEO, GEO & AEO improvement and digital marketing", url: "/projects" },
    { title: "Octopus Estates", desc: "Digital marketing and lead automation", url: "/projects" },
    { title: "Alphabet Chess", desc: "Website and automation", url: "/projects" },
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
        <h2>Projects</h2>
      </div>

      {/* 🔽 Feature Content inside container */}
      <div className="container">
        <div className="row" style={{ marginTop: "30px" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="col-xs-12 col-sm-6 col-md-4"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              style={{ marginBottom: 32 }}
            >
              <a
                href={f.url}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "all 0.3s ease",
                  padding: "20px",
                  borderRadius: "15px",
                  border: "2px solid transparent",
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#38b6ff";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
                }}
              >
                <div style={{ ...imgStyle, background: "linear-gradient(135deg, #0b1f3a 0%, #185a9d 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 900, height: 80 }}>{f.title.split(" ").map((w) => w[0]).join("")}</div>
                <h3
                  style={{
                    margin: "15px 0 10px 0",
                    fontSize: "1.2em",
                    fontWeight: "600",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 15px 0",
                    fontSize: "0.9em",
                    color: "#666",
                  }}
                >
                  {f.desc}
                </p>
                <div
                  style={{
                    fontSize: "0.8em",
                    color: "#38b6ff",
                    fontWeight: "500",
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                  }}
                >
                  View projects →
                </div>
              </a>
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
            .col-xs-6.col-md-3 a {
              padding: 15px !important;
              margin: 0 5px;
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
            .col-xs-6.col-md-3 a {
              padding: 12px !important;
              margin: 0 2px;
            }
            .col-xs-6.col-md-3 h3 {
              font-size: 1em !important;
            }
            .col-xs-6.col-md-3 p {
              font-size: 0.8em !important;
            }
          }
        `}
      </style>
    </div>
  );
};
