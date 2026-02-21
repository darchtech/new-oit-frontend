import { publicUrlFor } from "../../../../globals/constants";

function SectionVideo2() {
  return (
    <>
      <div
        className="container section-full sx-video-2-outer sx-atc-fixed position-relative"
        style={{
          backgroundImage: `url(${publicUrlFor("images/vid-1-bg.jpg")})`,
          minHeight: "50vh",      // mobile default
          height: "65vh",         // tablet / desktop
          overflow: "hidden",
           marginTop:"50px"
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/QUu95YNqY0c?autoplay=1&mute=1"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            border: "none",
          }}
        ></iframe>

        {/* <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className=" container sx-vodeo-section text-center">
            <div className="sx-video-btn-wrap">
              <a
                href="https://www.youtube.com/watch?v=QUu95YNqY0c"
                className="mfp-video circle"
              >
                <i className="flaticon-play" />
              </a>
            </div>
          </div>
        </div> */}

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           
          }}
        >
          <div
            className="container sx-vodeo-section text-center"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <div
              className="sx-video-btn-wrap"
              style={{
                padding: "6vh 0",
                
              }}
            >
              <a
                href="https://www.youtube.com/watch?v=QUu95YNqY0c"
                className="mfp-video circle"
              >
                <i
                  className="flaticon-play"
                  style={{
                    fontSize: "48px",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionVideo2;
