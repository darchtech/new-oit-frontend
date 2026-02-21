import React, { useEffect, useState, useCallback } from "react";
import "./placement.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL;
const DOMAIN = process.env.REACT_APP_DOMAIN;

function Placement() {
  const [placements, setPlacements] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH PLACEMENTS ================= */
  const fetchPlacements = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/placements`, {
        headers: { "x-domain": DOMAIN },
      });
      setPlacements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch placements", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlacements();
  }, [fetchPlacements]);

  const openImage = (img) => setSelectedImg(img);
  const closeModal = () => setSelectedImg(null);

  return (
    <>
      {/* ================= HERO ================= */}
      {/* <section className="placement-hero-section shadow">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-8 col-md-10">
              <h6 className="placement-hero-subtitle">
                Start Your Career Journey
              </h6>

              <h1 className="placement-hero-title text-white">
                Turning Skills into Careers <br />
                Learning to Professional <br /> Excellence
              </h1>

              <p className="placement-hero-text">
                Since failure can happen on any path, choosing work you love
                makes the journey meaningful.
              </p>

              <button
                className="placement-hero-btn"
                onClick={() => navigate("/contact-us")}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* ================= PLACEMENTS ================= */}
      <section className="placement-section mt-1">
        <div className="container">
          <div className="text-center mb-5">

  <h6 className="" style={{ color: "#a43013" }}>
                Start Your Career Journey
              </h6>

             <h1 className="" style={{ color: "orange" }}>
  <b>Turning Skills into Careers 
  Learning to Professional <br /> Excellence</b>
</h1>



            <h2 className="placement-title">Our Latest Placed Students</h2>
            <p className="placement-subtitle">
              Meet our talented students who secured their dream jobs.
            </p>
          </div>

          {/* ================= LOADER ================= */}
          {loading && (
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <div className="placement-loader"></div>
                <p className="mt-3">Loading placements...</p>
              </div>
            </div>
          )}

          {/* ================= CARDS ================= */}
          {!loading && (
            <div className="row align-items-stretch">
              {placements.map((item, index) => (
                <div
                  key={item._id || index}
                  className="col-lg-3 col-md-6 mb-4 d-flex"
                >
                  {/* 🔥 h-100 + flex-column = SAME HEIGHT */}
                  <div
                    className="placement-card text-center d-flex flex-column h-100 w-100"
                    onClick={() => openImage(item.image)}
                    style={{ animationDelay: `${index * 0.15}s` }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="placement-img">
                      <img
                        src={item.image || "https://via.placeholder.com/120"}
                        alt={item.name || "Placed Student"}
                        loading="lazy"
                      />
                    </div>

                    <h5>{item.name}</h5>

                    <p>
                      <strong>Position : </strong> {item.position}
                    </p>

                    <h6>
                      <strong>Company : </strong> <b>{item.company}</b>
                    </h6>

                    <p className="student-college">
                      <strong>College Name : </strong>
                      {item.college || "College Name"}
                    </p>

                    {/* 🔥 pushes content evenly */}
                    <div className="student-package mt-auto">
                      <strong>Package : </strong>
                      {item.packageAmount || "Package Not Disclosed"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= LIGHTBOX ================= */}
          {selectedImg && (
            <div className="lightbox" onClick={closeModal}>
              <span className="close-btn">&times;</span>
              <img
                src={selectedImg}
                alt="Placement"
                className="lightbox-img"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          
        </div>






        
      </section>
    </>
  );
}

export default Placement;