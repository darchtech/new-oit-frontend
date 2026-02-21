// src/components/ContactForm.jsx
import { useState } from "react";
import "./ContactForm.css"; // <-- New CSS file

const API = process.env.REACT_APP_API_BASE_URL;
const DOMAIN = process.env.REACT_APP_DOMAIN;

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const fullNameTrimmed = form.fullName.trim();
    if (!fullNameTrimmed) {
      setErrorMsg("Please enter your full name.");
      setLoading(false);
      return;
    }

    const nameParts = fullNameTrimmed.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const response = await fetch(`${API}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: form.phone,
          email: form.email,
          course: form.course,
          message: form.message,
          domain: DOMAIN,
        }),
      });

      if (response.ok) {
        setSuccessMsg("Contact submitted successfully ✅");
        setForm({
          fullName: "",
          phone: "",
          email: "",
          course: "",
          message: "",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMsg(
          errorData.message || "Failed to submit enquiry ❌"
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-wrapper w-100">

        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="alert alert-danger">{errorMsg}</div>
        )}

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="form-control"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="col-md-12">
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Course</option>
              <option>Full Stack Development</option>
              <option>Mern Stack</option>
              <option>Java FullStack</option>
              <option>PHP FullStack</option>
              <option>Python FullStack</option>
              <option>.Net FullStack</option>
              <option>Mean Stack</option>
              <option>Data Science</option>
              <option>Cyber Security</option>
              <option>Digital Marketing</option>
              <option>UI UX Developer</option>
              <option>Flutter</option>
              <option>Sales Force Development</option>
            </select>
          </div>

          <div className="col-md-12">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              className="form-control"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <div className="col-md-12">
            <button
              type="submit"
              className="orange-btn-form"
              disabled={loading}
            >
              {loading ? "Sending..." : "Connect Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}