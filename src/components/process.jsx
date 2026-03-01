import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We understand your business, goals, and target audience through in-depth consultation.",
    icon: "fa fa-comments",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We craft a tailored plan combining development, marketing, and automation for maximum impact.",
    icon: "fa fa-map",
  },
  {
    number: "03",
    title: "Execute",
    description: "Our team builds, launches, and runs campaigns with precision and speed.",
    icon: "fa fa-rocket",
  },
  {
    number: "04",
    title: "Scale",
    description: "We optimize, iterate, and help you grow 3x faster with data-driven decisions.",
    icon: "fa fa-line-chart",
  },
];

export const Process = () => {
  return (
    <div
      id="process"
      style={{
        background: "#fff",
        padding: "80px 0",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#185a9d",
              marginBottom: 15,
            }}
          >
            How We Work
          </h2>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#666",
              maxWidth: 550,
              margin: "0 auto",
            }}
          >
            A proven 4-step process to take your business from idea to growth
          </p>
        </motion.div>

        <div className="process-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              className="process-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="process-number">{step.number}</div>
              <div className="process-icon">
                <i className={step.icon}></i>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="process-arrow">
                  <i className="fa fa-chevron-right"></i>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .process-card {
          text-align: center;
          padding: 30px 20px;
          border-radius: 15px;
          background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
          border: 2px solid #e9ecef;
          position: relative;
          transition: all 0.3s ease;
        }

        .process-card:hover {
          border-color: #38b6ff;
          box-shadow: 0 12px 30px rgba(56, 182, 255, 0.15);
        }

        .process-number {
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #38b6ff 0%, #185a9d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          line-height: 1;
        }

        .process-icon {
          font-size: 2rem;
          color: #38b6ff;
          margin-bottom: 15px;
        }

        .process-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #185a9d;
          margin-bottom: 10px;
        }

        .process-desc {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .process-arrow {
          display: none;
        }

        @media (min-width: 992px) {
          .process-arrow {
            display: block;
            position: absolute;
            right: -22px;
            top: 50%;
            transform: translateY(-50%);
            color: #38b6ff;
            font-size: 1.2rem;
            z-index: 2;
            opacity: 0.5;
          }
        }

        @media (max-width: 991px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .process-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>
    </div>
  );
};
