import React from "react";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <div
      id="cta"
      style={{
        background: "linear-gradient(135deg, #185a9d 0%, #38b6ff 100%)",
        padding: "80px 0",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "700",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Ready to Build, Market & Scale Your Business?
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              marginBottom: "40px",
              opacity: "0.9",
              maxWidth: "600px",
              margin: "0 auto 40px auto",
            }}
          >
            Let's discuss how our development and marketing solutions can
            accelerate your growth and drive measurable results.
          </p>

          <div className="cta-buttons">
            <motion.a
              href="https://wa.me/918084630858?text=Hi%20Taipreneur%20Agency!%20I%20am%20looking%20for%20some%20services%20for%20my%20business.%20Please%20let%20me%20know%20about%20your%20services%20and%20pricing.%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fa fa-rocket"></i>
              Get Started Today
            </motion.a>
            <motion.a
              href="tel:+918084630858"
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fa fa-phone"></i>
              Call Now
            </motion.a>
          </div>

          <div className="cta-features">
            <div className="cta-feature">
              <i className="fa fa-check-circle"></i>
              <span>Free Strategy Call</span>
            </div>
            <div className="cta-feature">
              <i className="fa fa-check-circle"></i>
              <span>Custom Proposal</span>
            </div>
            <div className="cta-feature">
              <i className="fa fa-check-circle"></i>
              <span>No Long-term Contracts</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .cta-btn.primary {
          background: white;
          color: #185a9d;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .cta-btn.primary:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
        }

        .cta-btn.secondary {
          background: transparent;
          color: white;
          border-color: white;
        }

        .cta-btn.secondary:hover {
          background: white;
          color: #185a9d;
          transform: translateY(-2px);
        }

        .cta-features {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .cta-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 500;
        }

        .cta-feature i {
          color: #43e97b;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .cta-features {
            gap: 20px;
          }

          #cta h2 {
            font-size: 2.2rem !important;
          }

          #cta > .container p {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
