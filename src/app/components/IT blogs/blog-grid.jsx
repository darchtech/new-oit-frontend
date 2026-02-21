import { useEffect, useState } from "react";
import axios from "axios";
import "./BlogGridPage.css";

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const DOMAIN = process.env.REACT_APP_DOMAIN;

export default function BlogGridPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BLOGS ================= */
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/blogs`, {
        headers: { "x-domain": DOMAIN },
      });
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= SCROLL LOCK ================= */
useEffect(() => {
  const body = document.body;

  if (selectedBlog || imagePreview) {
    body.style.overflow = "hidden";
    body.style.height = "100vh";
  } else {
    body.style.overflow = "";
    body.style.height = "";
  }

  return () => {
    body.style.overflow = "";
    body.style.height = "";
  };
}, [selectedBlog, imagePreview]);


  return (
    <div className="blog-page">
      <h2 className="page-title">Our Blogs</h2>

      {/* ================= LOADER ================= */}
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading blogs...</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((b) => (
            <div key={b._id} className="blog-card fade-up">
              {b.image && (
                <img
                  src={b.image}
                  alt="blog"
                  className="clickable-img"
                  onClick={() => setImagePreview(b.image)}
                />
              )}

              <div className="blog-content">
                <h4>{b.title}</h4>
                <small>By {b.author}</small>
                <p>{b.paragraphs?.slice(0, 2).join(" ")}</p>
                <button onClick={() => setSelectedBlog(b)}>Read More</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= IMAGE MODAL ================= */}
      {imagePreview && (
        <div className="modal-overlay" onClick={() => setImagePreview(null)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setImagePreview(null)}
            >
              &times;
            </button>
            <img src={imagePreview} alt="Preview" />
          </div>
        </div>
      )}

      {/* ================= BLOG CONTENT MODAL ================= */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedBlog(null)}
            >
              &times;
            </button>

            <h2>{selectedBlog.title}</h2>
            <p>
              <b>{selectedBlog.author}</b>
            </p>
            <small>
              {new Date(selectedBlog.publishedAt).toLocaleDateString()}
            </small>

            {selectedBlog.image && (
              <img src={selectedBlog.image} alt="" className="modal-image" />
            )}

            {selectedBlog.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}