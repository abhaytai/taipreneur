import React, { useEffect, useRef } from "react";

export const Navigation = (props) => {
  const navRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      const menu = document.getElementById("bs-example-navbar-collapse-1");
      const toggle = document.querySelector(".navbar-toggle");
      if (
        menu &&
        menu.classList.contains("in") &&
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        toggle && toggle.click();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      id="menu"
      className="navbar navbar-default navbar-fixed-top"
      ref={navRef}
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            <span style={{ color: "#ff0000" }}>TAI</span>
            <span style={{ color: "#38b6ff" }}>PRENEUR</span>
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                href="/projects"
                title="Projects - Our Work"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="page-scroll"
                title="Our Services"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#process"
                className="page-scroll"
                title="How We Work"
              >
                Process
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="page-scroll"
                title="About Taipreneur Agency"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="page-scroll"
                title="Client Testimonials"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="page-scroll"
                title="Contact Taipreneur Agency"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="/brochure" title="Taipreneur Brochure">
                Brochure
              </a>
            </li>
            <li>
              <a href="/blog" title="Taipreneur Blog">
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://calendly.com/learnadam333d/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{
                  background:
                    "linear-gradient(90deg, #38b6ff 0%, #185a9d 100%)",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: "25px",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Book a Free Call
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
