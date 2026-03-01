import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Digital Marketing", "Development", "Business Solutions"];
const categoryIcons = {
  "Digital Marketing": "fa fa-bullhorn",
  "Development": "fa fa-code",
  "Business Solutions": "fa fa-briefcase",
};

export const Services = (props) => {
  const [active, setActive] = useState("Digital Marketing");

  const services = props.data || {};

  return (
    <div
      id="services"
      style={{
        width: "100vw",
        background: "linear-gradient(135deg, #38b6ff 0%, #185a9d 100%)",
        padding: "80px 0 60px 0",
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        <h2
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "2.5rem",
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          Our Services
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "1.15rem",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          End-to-end solutions to build, market, and scale your business
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="services-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`services-tab ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            <i className={categoryIcons[cat]} style={{ marginRight: 8 }}></i>
            {cat}
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="services-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {services[active]
            ? services[active].map((service, idx) => (
                <motion.div
                  className="service-card"
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.04, y: -5 }}
                >
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="service-title">{service.name}</h3>
                  <p className="service-description">{service.text}</p>
                </motion.div>
              ))
            : "Loading..."}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .services-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 0 auto 40px auto;
          padding: 0 20px;
          flex-wrap: wrap;
          max-width: 800px;
        }

        .services-tab {
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.85);
          border: 2px solid rgba(255, 255, 255, 0.25);
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .services-tab:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          color: #fff;
        }

        .services-tab.active {
          background: #fff;
          color: #185a9d;
          border-color: #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px 25px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(56, 182, 255, 0.1);
        }

        .service-card:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          border-color: #38b6ff;
        }

        .service-icon {
          font-size: 2.8rem;
          color: #38b6ff;
          margin-bottom: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .service-title {
          color: #185a9d !important;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .service-description {
          color: #555 !important;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            padding: 0 15px;
          }

          .service-card {
            padding: 20px 15px;
          }

          .service-icon {
            font-size: 2.2rem;
          }

          .service-title {
            font-size: 1.05rem;
          }

          .service-description {
            font-size: 0.85rem;
          }

          .services-tabs {
            gap: 8px;
          }

          .services-tab {
            padding: 10px 18px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
