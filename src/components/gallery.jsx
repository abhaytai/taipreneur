import React from "react";

// 🔁 Replacing Image import with inline definition for full control
const Image = ({ title, smallImage }) => {
  return (
    <div className="image-container">
      <img src={smallImage} alt={title} className="main-image" />
      <div className="image-text">{title}</div>
    </div>
  );
};

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center" style={{ padding: "0rem 0" }}>
      <div className="section-title" style={{ marginBottom: "1rem" }}>
        <h2 style={{ marginBottom: "2.5rem", fontWeight: 800 }}>Hobbies</h2>
      </div>

      <div className="custom-gallery-row">
        {props.data
          ? props.data.map((d, i) => (
              <div key={`${d.title}-${i}`} className="custom-gallery-col">
                <Image
                  title={d.title}
                  smallImage={d.smallImage}
                  largeImage={d.largeImage}
                />
              </div>
            ))
          : "Loading..."}
      </div>

      <style>
        {`
          .custom-gallery-row {
            display: flex;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
          }

          .custom-gallery-col {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }

          .custom-gallery-col img {
            width: 100%;
            height: auto;
            display: block;
          }

          @media (min-width: 992px) {
            .custom-gallery-row {
              width: 100vw;
              margin-left: 0;
              margin-right: 0;
            }

            .custom-gallery-col {
              width: 33.3333%;
              padding: 0;
              margin: 0;
            }
          }

          /* 🔁 NEW STYLES BELOW (added for reversed hover effect) */
          .image-container {
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .image-text {
            position: absolute;
            bottom: 0;
            width: 100%;
            color: white;
            background: rgba(0, 0, 0, 0.6); /* optional: dark overlay */
            padding: 0.75rem;
            font-size: 1.2rem;
            font-weight: 900;
            text-align: center;
            transition: opacity 0.3s ease;
          }

          .image-container:hover .image-text {
            opacity: 0; /* 🔁 text disappears on hover */
          }

          .image-container img {
            display: block;
            width: 100%;
            height: auto;
            transition: transform 0.3s ease;
          }

          .image-container:hover img {
            transform: scale(1.03); /* 🔁 optional zoom-in on hover */
          }
        `}
      </style>
    </div>
  );
};
