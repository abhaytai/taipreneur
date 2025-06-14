import React, { useState } from "react";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
          setFormData({ name: "", email: "", message: "" });
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
              <textarea
                placeholder="Your Message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Query</button>
              {success && (
                <p className="success-msg">
                  Message sent successfully! We'll get back to you soon
                </p>
              )}
            </form>

            <div className="contact-info">
              <p className="contact-info-item">
                <i className="fa fa-phone"></i> +91 80846 30858
              </p>
              <p className="contact-info-item">
                <i className="fa fa-envelope-o"></i> service@taipreneur.com
              </p>
              <div className="contact-quote" style={{ fontSize: "2rem" }}>
                <span>"Nothing Exists Forever Except Change"</span>
                <br />
              </div>
              <div className="contact-quote" style={{ fontSize: "2rem" }}>
                <span>
                  "Never Forgot Your Motive, Never Skip Your Destination"
                </span>
                <br />
              </div>
              <div className="contact-quote" style={{ fontSize: "2rem" }}>
                <span>"Self Honest is Confidence"</span>
                <br />
                <span style={{ fontWeight: 600 }}>~Tai</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          © 2025 ALL RIGHTS RESERVED - TAIPRENEUR
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
          gap: 1rem;
        }

        .form-card input,
        .form-card textarea {
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          width: 100%;
          color: #111;
        }

        .form-card button {
          background-color:rgb(255, 61, 61);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .form-card button:hover {
          background-color: #38b6ff;
        }

        .success-msg {
          color: green;
          margin-top: 0.75rem;
          font-weight: 600;
        }

        .contact-info {
          margin-top: 2rem;
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
