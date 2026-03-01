import React from "react";
import { motion } from "framer-motion";

export const Stats = () => {
  const stats = [
    { number: "25+", label: "Projects Delivered", icon: "fa fa-code" },
    { number: "15+", label: "Happy Clients", icon: "fa fa-users" },
    { number: "300%", label: "Avg Client Growth", icon: "fa fa-rocket" },
    { number: "24/7", label: "Support Available", icon: "fa fa-support" },
  ];

  return (
    <div
      id="stats"
      style={{
        background: "linear-gradient(135deg, #38b6ff 0%, #185a9d 100%)",
        padding: "80px 0",
        color: "white",
      }}
    >
      <div className="container">
        <div className="text-center" style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Our Impact in Numbers
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              opacity: "0.9",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Delivering measurable results that drive business growth and success
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .stat-card {
          text-align: center;
          padding: 30px 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 10px;
          background: linear-gradient(45deg, #fff, #e3f2fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .stat-card {
            padding: 25px 15px;
          }
          
          .stat-icon {
            font-size: 2.5rem;
          }
          
          .stat-number {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
