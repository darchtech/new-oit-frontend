import React, { useState, useRef, useEffect } from "react";
import "./Client.css";

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const DOMAIN = process.env.REACT_APP_DOMAIN;

function SectionClients2() {
  const videoScrollRef = useRef(null);
  const googleScrollRef = useRef(null);

  const [videoEmbeds, setVideoEmbeds] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null);

  /* ================= FETCH VIDEO REVIEWS ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/video-reviews?domainName=${DOMAIN}`)
      .then((res) => res.json())
      .then((data) => data.success && setVideoEmbeds(data.data))
      .catch(console.error);
  }, []);

  /* ================= FETCH GOOGLE REVIEWS ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/text-reviews?domainName=${DOMAIN}`)
      .then((res) => res.json())
      .then((data) => data.success && setGoogleReviews(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ================= SCROLL HANDLER ================= */
  const scroll = (ref, dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="section-full sx-reviews-section">
      <div className="container">
        {/* ================= HEADER ================= */}
        <div className="sx-reviews-header">
          <h2 className="text-center"><b>What Our Students Say</b></h2>
          <p className="text-center">Real feedback from our students</p>
        </div>

        {/* ================= VIDEO SLIDER ================= */}
        <div className="reviews-slider-main">
          <button
            className="arrow-btn left"
            onClick={() => scroll(videoScrollRef, "left")}
          >
            &#10094;
          </button>

          <div className="video-slider-row" ref={videoScrollRef}>
            {videoEmbeds.map((v) => (
              <div className="video-card-item" key={v._id}>
                <div
                  className="video-iframe-wrapper"
                  dangerouslySetInnerHTML={{ __html: v.iframe }}
                />
              </div>
            ))}
          </div>

          <button
            className="arrow-btn right"
            onClick={() => scroll(videoScrollRef, "right")}
          >
            &#10095;
          </button>
        </div>

        {/* ================= GOOGLE REVIEWS HEADER ================= */}
        {/* <div className="review-top-bar text-center">
          <h1 >Google Reviews</h1>
        </div> */}
        <h1 className="text-center mt-5 "><b>Google Reviews</b></h1>

        {/* ================= GOOGLE REVIEWS SLIDER ================= */}
        <div className="reviews-slider-main">
          <button
            className="arrow-btn left"
            onClick={() => scroll(googleScrollRef, "left")}
          >
            &#10094;
          </button>

          <div className="google-reviews-grid" ref={googleScrollRef}>
            {loading && <p>Loading...</p>}

            {googleReviews.map((r) => (
              <div className="google-review-card-pro" key={r._id}>
                <div className="rev-profile-wrapper">
                  <div className="rev-avatar">{r.name?.charAt(0)}</div>
                </div>

                <div className="rev-name">
                  {r.name}
                  <span className="blue-tick">✔</span>
                </div>

                <div className="rev-date">
                  {new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="rev-stars">{"★".repeat(r.rating)}</div>

                <p
                  className={`rev-text ${
                    expandedReview === r._id ? "expanded" : ""
                  }`}
                >
                  {r.description}
                </p>

                {r.description.length > 80 && (
                  <button
                    className="read-more-btn"
                    onClick={() =>
                      setExpandedReview(expandedReview === r._id ? null : r._id)
                    }
                  >
                    {expandedReview === r._id ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            className="arrow-btn right"
            onClick={() => scroll(googleScrollRef, "right")}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionClients2;