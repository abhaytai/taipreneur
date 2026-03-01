import React, { useState } from "react";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_81o9z3c",
        "template_gn5jdkd",
        e.target,
        "QwkEfaVE3ucAYuorp"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id="contact" style={{ background: "#38b6ff", padding: "1rem 0" }}>
      <div className="container">
        <h2 className="contact-heading">CONTACT US</h2>

        <div className="contact-layout">
          {/* IMAGE */}
          <div className="image-strip">
            <img
              src="/img/Abhaysikkim.png"
              alt="Abhay"
              className="image-full"
            />
          </div>

          {/* FORM + INFO */}
          <div className="form-content">
            <form onSubmit={handleSubmit} className="form-card">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Service You Need
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="E-Commerce">E-Commerce Solutions</option>
                <option value="SEO">SEO & Content Marketing</option>
                <option value="Google Ads">Google Ads & PPC</option>
                <option value="Meta Ads">Meta / Instagram Ads</option>
                <option value="YouTube Ads">YouTube Advertising</option>
                <option value="Business Automation">Business Process Automation</option>
                <option value="AI Solutions">AI & Machine Learning</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                placeholder="Tell us about your project..."
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Query</button>
              {success && (
                <p className="success-msg">
                  Message sent successfully! We'll get back to you within 24 hours.
                </p>
              )}
            </form>

            <div className="contact-info">
              <p className="contact-info-item">
                <i className="fa fa-phone"></i> +91 80846 30858
              </p>
              <p className="contact-info-item">
                <i className="fa fa-envelope-o"></i> tai@taipreneur.com
              </p>
              <p className="contact-info-item">
                <i className="fa fa-map-marker"></i> Bangalore, India | Remote Worldwide
              </p>
              <div className="contact-quote" style={{ fontSize: "1.2rem" }}>
                <span>
                  "Your growth is our mission. Let's build something amazing
                  together."
                </span>
                <br />
                <br />
                <span style={{ fontWeight: 600 }}>~Taipreneur Agency</span>
              </div>
            </div>
          </div>
        </div>

        {/* EzoicAds Placement - Contact Section */}
        <div
          id="ezoic-pub-ad-placeholder-103"
          style={{ margin: "2rem 0", textAlign: "center" }}
        ></div>
        <script>
          {`
            if (window.ezstandalone) {
              window.ezstandalone.cmd.push(function () {
                window.ezstandalone.showAds(103);
              });
            }
          `}
        </script>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-copyright">
              &copy; 2026 ALL RIGHTS RESERVED - TAIPRENEUR
            </div>
            <div className="footer-links">
              <a href="/privacy-policy" className="footer-link">
                Privacy Policy
              </a>
              <span className="footer-separator">|</span>
              <a href="/terms-of-service" className="footer-link">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* STYLE */}
      <style>{`
        .contact-heading {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          color: white;
          margin-bottom: 2rem;
        }

        .contact-layout {
          display: flex;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          flex-direction: row;
        }

        .image-strip {
          width: 35%;
          min-width: 220px;
        }

        .image-full {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .form-content {
          padding: 2rem;
          flex: 1;
        }

        .form-card {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .form-card input,
        .form-card textarea,
        .form-card select {
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          width: 100%;
          color: #111;
          background: #fff;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }

        .form-card input:focus,
        .form-card textarea:focus,
        .form-card select:focus {
          border-color: #38b6ff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(56, 182, 255, 0.1);
        }

        .form-card select {
          appearance: auto;
        }

        .form-card button {
          background: linear-gradient(90deg, #38b6ff 0%, #185a9d 100%);
          color: white;
          border: none;
          padding: 0.85rem 1rem;
          font-weight: bold;
          font-size: 1.05rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-card button:hover {
          background: linear-gradient(90deg, #185a9d 0%, #38b6ff 100%);
          box-shadow: 0 4px 15px rgba(56, 182, 255, 0.3);
        }

        .success-msg {
          color: green;
          margin-top: 0.5rem;
          font-weight: 600;
        }

        .contact-info {
          margin-top: 1.5rem;
          color: #333;
        }

        .contact-info p {
          margin-bottom: 0.5rem;
        }

        .footer {
          text-align: center;
          margin-top: 2rem;
          color: white;
          font-size: 0.9rem;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .footer-link {
          color: white;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.3s ease;
          opacity: 0.9;
        }

        .footer-link:hover {
          color: #fff;
          text-decoration: underline;
        }

        .footer-separator {
          color: white;
          opacity: 0.6;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .footer-links {
            flex-direction: column;
            gap: 0.3rem;
          }

          .footer-separator {
            display: none;
          }
        }

        .contact-quote {
          margin-top: 1.5rem;
          text-align: center;
          color: #185a9d;
          font-size: 1.1rem;
          font-style: italic;
          font-weight: 500;
        }

        .contact-info-item {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 900px) {
          .contact-layout {
            flex-direction: column;
          }

          .image-strip {
            width: 100%;
            height: 320px;
          }
        }
      `}</style>
    </div>
  );
};
