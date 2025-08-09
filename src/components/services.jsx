import React from "react";
import { motion } from "framer-motion";

const services = {
  Core: ["Revenue Growth", "Sales"],
  AI: ["AI Agent", "Gen AI"],
  Marketing: ["AI-Driven Ads", "Social Media Marketing"],
  Development: ["No Code Dev", "Dev with AI"],
};

export const Services = () => (
  <div
    id="services"
    style={{
      width: "100vw",
      background: "#38b6ff",
      // padding: "1.5rem 0",
      margin: "10px 0 0 0",
      overflowX: "hidden",
    }}
  >
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        textAlign: "center",
        color: "#fff",
        fontWeight: 900,
        fontSize: "2.5rem",
        letterSpacing: 1.5,
        marginBottom: 40,
      }}
    >
      Areas of Impact
    </motion.h2>

    <div className="services-tree">
      {Object.entries(services).map(([category, items], idx) => (
        <motion.div
          className="category-branch"
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15 }}
          viewport={{ once: true }}
        >
          <div className="category-title">{category}</div>
          <div className="arrow-down" />
          <div className="branch-items">
            {items.map((item, i) => (
              <motion.div
                className="service-box"
                key={i}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>

    <style>{`
      .services-tree {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 40px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .category-branch {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .category-title {
        background: #fff;
        color: #38b6ff;
        font-weight: 700;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        text-align: center;
        position: relative;
        z-index: 1;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .arrow-down {
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid #ffffff;
        margin: 8px 0;
      }

      .branch-items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .service-box {
        background: rgba(255,255,255,0.1);
        color: #fff;
        padding: 0.6rem 1.2rem;
        border-radius: 10px;
        font-weight: 900;
        font-size: 1.05rem;
        text-align: center;
        min-width: 180px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: 0.3s ease;
      }

      @media (max-width: 768px) {
        .services-tree {
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .branch-items {
          flex-direction: column;
        }
      }
    `}</style>
  </div>
);
