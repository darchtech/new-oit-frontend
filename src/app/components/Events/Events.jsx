import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Events.css";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL;
const DOMAIN = process.env.REACT_APP_DOMAIN;

// Instagram Embed Component
const InstagramEmbed = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    const block = document.createElement("blockquote");
    block.className = "instagram-media";
    block.setAttribute("data-instgrm-permalink", url);
    block.setAttribute("data-instgrm-version", "14");
    block.style.width = "100%";
    containerRef.current.appendChild(block);

    if (!window.instgrm && !document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm?.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
      script.onerror = () => {
        console.warn("Instagram embed script failed to load");
      };
      document.body.appendChild(script);
    } else if (window.instgrm?.Embeds) {
      setTimeout(() => {
        window.instgrm.Embeds.process();
      }, 100);
    }
  }, [url]);

  return <div ref={containerRef} className="instagram-wrapper" />;
};

const emptyFormData = {
  title: "",
  eventDate: "",
  location: "",
  description: "",
  videoLink: "",
  imageBase64: "",
};

function Events() {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState(emptyFormData);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/events`, {
        headers: { "x-domain": DOMAIN },
      });
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Event fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/admin/login`, loginForm);
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminInfo", JSON.stringify(data.admin));
        setIsAdmin(true);
        setShowAdminLogin(false);
        setLoginForm({ email: "", password: "" });
        alert("Login successful!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    setIsAdmin(false);
  };

  const handleAddClick = () => {
    setFormData({ ...emptyFormData });
    setShowAddModal(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      eventDate: event.eventDate || "",
      location: event.location || "",
      description: event.description || "",
      videoLink: event.videoLink || "",
      imageBase64: "",
    });
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({ ...emptyFormData });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingEvent(null);
    setFormData({ ...emptyFormData });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${API}/api/events`,
        formData,
        {
          headers: {
            "x-domain": DOMAIN,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Event added successfully!");
      closeAddModal();
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API}/api/events/${editingEvent._id}`,
        formData,
        {
          headers: {
            "x-domain": DOMAIN,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Event updated successfully!");
      closeEditModal();
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API}/api/events/${id}`, {
        headers: {
          "x-domain": DOMAIN,
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="events-section">
      <div className="container">
        <h2 className="events-main-title">Our Training Moments</h2>

        <div className="admin-controls" style={{ textAlign: "right", marginBottom: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          {isAdmin ? (
            <>
              <button type="button" className="btn btn-success" onClick={handleAddClick}>
                ➕ Add Event
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setShowAdminLogin(true)}>
              Admin Login
            </button>
          )}
        </div>

        {showAdminLogin && (
          <div className="modal-overlay" onClick={() => setShowAdminLogin(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Admin Login</h3>
              <form onSubmit={handleAdminLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAdminLogin(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="modal-overlay" onClick={closeAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Add New Event</h3>
              <form onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Video Link (YouTube/Instagram)</label>
                  <input
                    type="url"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleFormChange}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.imageBase64 && (
                    <div style={{ marginTop: "10px" }}>
                      <p>Image Preview:</p>
                      <img src={formData.imageBase64} alt="Preview" style={{ maxWidth: "200px" }} />
                    </div>
                  )}
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Event"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditModal && editingEvent && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Event</h3>
              <form onSubmit={handleUpdateEvent}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Video Link (YouTube/Instagram)</label>
                  <input
                    type="url"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleFormChange}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {editingEvent.image && !formData.imageBase64 && (
                    <div style={{ marginTop: "10px" }}>
                      <p>Current Image:</p>
                      <img src={editingEvent.image} alt="Current" style={{ maxWidth: "200px" }} />
                    </div>
                  )}
                  {formData.imageBase64 && (
                    <div style={{ marginTop: "10px" }}>
                      <p>New Image Preview:</p>
                      <img src={formData.imageBase64} alt="Preview" style={{ maxWidth: "200px" }} />
                    </div>
                  )}
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Event"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="events-grid">
          {events.map((event, index) => {
            const embedUrl = getEmbedUrl(event.videoLink);
            return (
              <div className="event-card" key={event._id || index}>
                {isAdmin && (
                  <div className="event-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => handleEditClick(event)}
                      title="Edit Event"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteEvent(event._id)}
                      title="Delete Event"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                <div className="event-media-wrapper">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={event.title}
                      className="event-media"
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : event.videoLink && event.videoLink.includes("instagram.com") ? (
                    <InstagramEmbed url={event.videoLink} />
                  ) : (
                    <img
                      src={event.image || "https://via.placeholder.com/500"}
                      alt={event.title}
                      className="event-media"
                    />
                  )}
                </div>

                <div className="event-content">
                  <h4><b>{event.title}</b></h4>
                  <p className="event-desc">{event.description}</p>
                  <p>{event.eventDate}</p>
                  <p>{event.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Events;
