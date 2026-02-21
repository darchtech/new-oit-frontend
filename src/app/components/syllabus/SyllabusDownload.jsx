import "./SyllabusDownload.css";

const syllabusData = [
  {
    course: "Full Stack Development",
    subject: "HTML, CSS, JS, React, Node",
    file: "/syllabus/fullstack.pdf",
  },
  {
    course: "MERN Stack",
    subject: "MongoDB, Express, React, Node",
    file: "/syllabus/mern.pdf",
  },
  {
    course: "Java Full Stack",
    subject: "Core Java, Spring, Hibernate",
    file: "/syllabus/java-fullstack.pdf",
  },
  {
    course: "Python Full Stack",
    subject: "Python, Django, REST API",
    file: "/syllabus/python-fullstack.pdf",
  },
];

function SyllabusDownload() {
  return (
    <div className="syllabus-container">
      <h1>Syllabus Download</h1>
      <p>Select your course & download syllabus</p>

      <table className="syllabus-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Subjects Covered</th>
            <th>Download</th>
          </tr>
        </thead>

        <tbody>
          {syllabusData.map((item, index) => (
            <tr key={index}>
              <td>{item.course}</td>
              <td>{item.subject}</td>
              <td>
                <a
                  href={item.file}
                  download
                  className="download-btn"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SyllabusDownload;
