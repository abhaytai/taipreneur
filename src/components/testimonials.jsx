import React from "react";
import { motion } from "framer-motion";

export const Testimonials = (props) => {
  return (
    <div id="testimonials" style={{ background: "#f8f9fa", padding: "80px 0" }}>
      <div className="container">
        <div className="section-title text-center">
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#185a9d",
              marginBottom: "60px",
            }}
          >
            What Our Clients Say
          </h2>
        </div>
        <div className="testimonials-grid">
          {props.data
            ? props.data.map((d, i) => (
                <motion.div
                  key={`${d.name}-${i}`}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="testimonial-content">
                    <div className="quote-icon">
                      <i className="fa fa-quote-left"></i>
                    </div>
                    <p className="testimonial-text">"{d.text}"</p>
                    <div className="testimonial-meta">
                      <div className="testimonial-info">
                        <div className="testimonial-name">{d.name}</div>
                        <div className="testimonial-company">{d.company}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            : "loading"}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .testimonial-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(56, 182, 255, 0.1);
        }

        .testimonial-card:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          border-color: #38b6ff;
        }

        .quote-icon {
          color: #38b6ff;
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 25px;
          font-style: italic;
        }

        .testimonial-meta {
          display: flex;
          align-items: center;
          gap: 0px;
        }

        .testimonial-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #38b6ff;
        }

        .testimonial-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial-name {
          font-weight: 700;
          color: #185a9d;
          font-size: 1.1rem;
        }

        .testimonial-company {
          color: #666;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .testimonial-card {
            padding: 25px 20px;
          }
        }
      `}</style>
    </div>
  );
};
