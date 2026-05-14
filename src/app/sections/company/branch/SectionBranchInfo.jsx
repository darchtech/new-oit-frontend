import { Link } from "react-router-dom";

function SectionBranchInfo() {
  return (
    <section
      className="section-branch-info py-5"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="branch-info-content">
              <h2 className="section-title" style={{ color: "#ff6600" }}>
                Our Kolhapur Branch
              </h2>
              <p className="section-description" style={{ color: "#333" }}>
                Welcome to OrangeIT Kolhapur Branch. We are committed to
                providing top-quality IT training and services to our students
                and clients in the Kolhapur region.
              </p>
              <p style={{ color: "#555" }}>
                Our Kolhapur branch offers a wide range of courses including
                Full Stack Development, Data Science & AI, Mobile App
                Development, and more. With experienced instructors and
                state-of-the-art facilities, we ensure the best learning
                experience for our students.
              </p>
              {/* <Link
                to="/courses"
                className="btn mt-3"
                style={{
                  backgroundColor: "#ff6600",
                  color: "#fff",
                  border: "none",
                  padding: "10px 25px",
                }}
              >
                Explore Our Courses
              </Link> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="branch-image"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(255, 102, 0, 0.15)",
              }}
            >
              <img
                src="images/branch/kolhapur-branch.jpg"
                alt="Kolhapur Branch"
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Kolhapur+Branch";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionBranchInfo;
