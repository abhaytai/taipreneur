import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
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
              <a href="#features" className="page-scroll">
                Experince
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Hobbies
              </a>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/HEmwTraQLab8IRPzwFWvbw"
                className="page-scroll"
              >
                Taipreneur Community
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1Cd_LP61u3HhAFGLOa-pnxMHGn29jaP9N/view?usp=sharing"
                className="page-scroll"
              >
                Hire Me
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
