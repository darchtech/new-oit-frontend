function SectionContactInfo() {
  return (
    <section
      className="section-contact-info py-5"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="section-title" style={{ color: "#ff6600" }}>
              Contact Us
            </h2>
            <p className="section-description">
              Get in touch with our Nashik branch
            </p>
          </div>
        </div>
        <div className="row gx-2">
          <div className="col-md-4 mb-4">
            <div
              className="contact-card text-center p-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                padding: "20px",
                transform: "translateY(-5px)",
                height: "100%",
              }}
            >
              <div className="contact-icon mb-3">
                <i
                  className="fa fa-map-marker fa-2x"
                  style={{ color: "#ff6600" }}
                ></i>
              </div>
              <h4 style={{ color: "#ff6600" }}>Address</h4>
              <p style={{ color: "#333" }}>
                S-7, 2nd Floor, Suyojit Sankul Apartment,
                <br />
                Old Pandit Colony, Sharanpur Road,
                <br />
                Nashik - 422002
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="contact-card text-center p-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                padding: "20px",
                transform: "translateY(-5px)",
                height: "100%",
              }}
            >
              <div className="contact-icon mb-3">
                <i
                  className="fa fa-phone fa-2x"
                  style={{ color: "#ff6600" }}
                ></i>
              </div>
              <h4 style={{ color: "#ff6600" }}>Phone</h4>
              <p>
                <a
                  href="tel:+919876543210"
                  className="text-decoration-none"
                  style={{ color: "#000" }}
                >
                  +91 98765 43210
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="contact-card text-center p-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                padding: "20px",
                transform: "translateY(-5px)",
                height: "100%",
              }}
            >
              <div className="contact-icon mb-3">
                <i
                  className="fa fa-envelope fa-2x"
                  style={{ color: "#ff6600" }}
                ></i>
              </div>
              <h4 style={{ color: "#ff6600" }}>Email</h4>
              <p>
                <a
                  href="mailto:nashik@orangeitech.com"
                  className="text-decoration-none"
                  style={{ color: "#000" }}
                >
                  nashik@orangeitech.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="row mt-4">
          <div className="col-12">
            <div
              className="map-container"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <iframe
                title="Nashik Branch Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.5!2d73.78!3d19.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU5JzI0LjAiTiA3M8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-center mt-3">
              <a
                href="https://maps.app.goo.gl/tcRfhaAPvdv58Zg96"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg"
                style={{
                  backgroundColor: "#ff6600",
                  color: "#fff",
                  border: "none",
                  padding: "12px 30px",
                }}
              >
                <i className="fa fa-directions"></i> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionContactInfo;
