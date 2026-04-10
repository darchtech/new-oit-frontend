// import axios from "axios";
// import { useState } from "react";
// import "./ContactFormPage.css";

// const API = process.env.REACT_APP_API_BASE_URL;
// const DOMAIN = process.env.REACT_APP_DOMAIN;

// function ContactFormPage() {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     course: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");
//     setErrorMsg("");

//     try {
//       await axios.post(`${API}/api/enquiries`, {
//         ...form,
//         domain: DOMAIN,
//       });

//       setSuccessMsg("Contact submitted successfully ✅");

//       setForm({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         course: "",
//         message: "",
//       });
//     } catch (error) {
//       setErrorMsg(
//         error.response?.data?.message || "Failed to submit enquiry ❌"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid contact-bg py-5">
//       <div className="container contact-page shadow-lg rounded">
//         <div className="row">
//           {/* LEFT PANEL */}
//           <div className="col-md-3 left-panel d-flex flex-column justify-content-between p-4">
//             <div>
//               <div className="logo mb-4">
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//                 <strong>OrangeITech</strong>
//               </div>

//               <h3 className="contact-headline">
//                 Let’s Build Your <span>Career</span>
//               </h3>

//               <div className="contact-divider"></div>

//               <ul className="contact-feature-list">
//                 <li>Industry-ready courses</li>
//                 <li>Live project-based learning</li>
//                 <li>Placement & career support</li>
//                 <li>Expert mentor guidance</li>
//               </ul>
//             </div>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="col-md-9 right-panel d-flex align-items-center">
//             <div className="contact-form-wrapper w-100">
//               <h2 className="contact-form-title">Contact Us</h2>
//               <p className="contact-subtitle">
//                 Tell us your goals — we'll guide you within{" "}
//                 <strong>24 hours</strong>
//               </p>

//               {successMsg && (
//                 <div className="alert alert-success">{successMsg}</div>
//               )}
//               {errorMsg && (
//                 <div className="alert alert-danger">{errorMsg}</div>
//               )}

//               <form className="row g-3" onSubmit={handleSubmit}>
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={form.firstName}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="First Name"
//                     required
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={form.lastName}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Last Name"
//                     required
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={form.phone}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Phone Number"
//                     required
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Email Address"
//                     required
//                   />
//                 </div>

//                 <div className="col-md-12">
//                   <select
//                     name="course"
//                     value={form.course}
//                     onChange={handleChange}
//                     className="form-select"
//                     required
//                   >
//                     <option value="">Select Course</option>
//                     <option>Full Stack Development</option>
//                     <option>Mern Stack</option>
//                     <option>Java FullStack</option>
//                     <option>PHP FullStack</option>
//                     <option>Python FullStack</option>
//                     <option>.Net FullStack</option>
//                     <option>Mean Stack</option>
//                     <option>Data Science</option>
//                     <option>Cyber Security</option>
//                     <option>Digital Marketing</option>
//                     <option>UI UX Developer</option>
//                     <option>Flutter</option>
//                     <option>Sales Force Development</option>
//                   </select>
//                 </div>

//                 <div className="col-md-12">
//                   <textarea
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     rows="6"
//                     className="form-control"
//                     placeholder="Your Message"
//                     required
//                   ></textarea>
//                 </div>

//                 <div className="col-md-12">
//                   <button
//                     type="submit"
//                     className="btn send-btn"
//                     disabled={loading}
//                   >
//                     {loading ? "Sending..." : "Send Message"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactFormPage;

import axios from "axios";
import { useState } from "react";
import "./ContactFormPage.css";

const API = process.env.REACT_APP_API_BASE_URL;
const DOMAIN = process.env.REACT_APP_DOMAIN;

// 🔹 Course → PDF map
const coursePdfMap = {
  "Mern Stack": "/assets/pdfs/MERN stack  Booklet (1).pdf",
  "Java FullStack": "/assets/pdfs/Java fullstack Booklet.pdf",
  "PHP FullStack": "/assets/pdfs/Php fullstack course Booklet.pdf",
  "Python FullStack": "/assets/pdfs/Python fullstack course Booklet.pdf",
  ".Net FullStack": "/assets/pdfs/Dot Net booklet.pdf",
  "Mean Stack": "/assets/pdfs/Mean stack course Booklet.pdf",
  "Data Science": "/assets/pdfs/Data science booklet.pdf",
  "Data Analyst": "/assets/pdfs/Data Analyst booklet.pdf",
  "Digital Marketing": "/assets/pdfs/Digital marketing booklet.pdf",
  "Cyber Security": "/assets/pdfs/Cyber security Booklet.pdf",
  Flutter: "/assets/pdfs/Flutter fullstack Booklet.pdf",
  "Sales Force Development": "/assets/pdfs/Salesforce course Booklet.pdf",
  "Angular Development": "/assets/pdfs/Angular js booklet.pdf",
  "React JS Development": "/assets/pdfs/React js booklet.pdf",
  "Android App Development": "/assets/pdfs/Android development Booklet.pdf",
  "C Programming": "/assets/pdfs/C Programming Booklet.pdf",
  "Core Java": "/assets/pdfs/Core Java Booklet.pdf",
  DSA: "/assets/pdfs/DSA course Booklet.pdf",
  Devops: "/assets/pdfs/DevOps course Booklet.pdf",
  "UI UX Developer": "/assets/pdfs/UIUX development Booklet.pdf",
};

function ContactFormPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // ✅ Send data to backend
      await axios.post(`${API}/api/enquiries`, {
        ...form,
        domain: DOMAIN,
      });

      setSuccessMsg("Contact submitted successfully ✅");

      // 🔹 PDF open + auto download
      const pdfUrl = coursePdfMap[form.course];
      if (pdfUrl) {
        // Open PDF in new tab
        window.open(pdfUrl, "_blank", "noopener,noreferrer");

        // Trigger download after short delay
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = pdfUrl.split("/").pop(); // use filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 500);
      }

      // 🔹 Reset form
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        course: "",
        message: "",
      });
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to submit enquiry ❌",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid contact-bg py-5">
      <div className="container contact-page shadow-lg rounded">
        <div className="row">
          {/* LEFT PANEL */}
          <div className="col-md-3 left-panel p-4">
            <h3>Let’s Build Your Career </h3>
            <ul>
              <li>Industry-ready courses</li>
              <li>Live project-based learning</li>
              <li>Placement & career support</li>
              <li>Expert mentor guidance</li>
            </ul>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-md-9 right-panel">
            <h2>Contact Us</h2>
            <p>
              Tell us your goals — we'll guide you within{" "}
              <strong>24 hours</strong>
            </p>

            {successMsg && (
              <div className="alert alert-success">{successMsg}</div>
            )}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Last Name"
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
                  placeholder="Phone"
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
                  placeholder="Email"
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
                  {Object.keys(coursePdfMap).map((course, index) => (
                    <option key={index}>{course}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-12">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                  placeholder="Your Message (optional)"
                />
              </div>

              <div className="col-md-12">
                <button
                  className="btn send-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactFormPage;
