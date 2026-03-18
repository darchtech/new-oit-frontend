import React, { useState, useEffect } from "react";
import "./QuizAdmin.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const QuizAdmin = () => {
  const [activeTab, setActiveTab] = useState("add"); // 'add' or 'view'
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form state
  const [formData, setFormData] = useState({
    statement: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
  });

  // Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/question/get-all`);
      const data = await response.json();
      if (response.ok) {
        setQuestions(data);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to fetch questions",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error fetching questions" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "view") {
      fetchQuestions();
    }
  }, [activeTab]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit question
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation
    if (
      !formData.statement ||
      !formData.option1 ||
      !formData.option2 ||
      !formData.option3 ||
      !formData.option4 ||
      !formData.correctAnswer
    ) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    // Check if correct answer matches one of the options
    const options = [
      formData.option1,
      formData.option2,
      formData.option3,
      formData.option4,
    ];
    if (!options.includes(formData.correctAnswer)) {
      setMessage({
        type: "error",
        text: "Correct answer must match one of the options",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/question/create-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statement: formData.statement,
          options: options,
          correctAnswer: formData.correctAnswer,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Question added successfully!" });
        setFormData({
          statement: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctAnswer: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to add question",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error adding question" });
    } finally {
      setLoading(false);
    }
  };

  // Delete question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/question/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Question deleted successfully!" });
        fetchQuestions();
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to delete question",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error deleting question" });
    }
  };

  return (
    <div className="quiz-admin-container">
      <div className="quiz-admin-header">
        <h1>📝 Quiz Management</h1>
        <div className="admin-tabs">
          <button
            className={activeTab === "add" ? "active" : ""}
            onClick={() => setActiveTab("add")}
          >
            ➕ Add Question
          </button>
          <button
            className={activeTab === "view" ? "active" : ""}
            onClick={() => setActiveTab("view")}
          >
            📋 View Questions
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* ADD QUESTION TAB */}
      {activeTab === "add" && (
        <div className="add-question-form">
          <h2>Add New Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="statement">Question Statement *</label>
              <textarea
                id="statement"
                name="statement"
                rows="3"
                value={formData.statement}
                onChange={handleInputChange}
                placeholder="Enter your question here..."
                required
              />
            </div>

            <div className="form-group">
              <label>Options *</label>
              <div className="options-grid">
                <input
                  type="text"
                  name="option1"
                  value={formData.option1}
                  onChange={handleInputChange}
                  placeholder="Option 1"
                  required
                />
                <input
                  type="text"
                  name="option2"
                  value={formData.option2}
                  onChange={handleInputChange}
                  placeholder="Option 2"
                  required
                />
                <input
                  type="text"
                  name="option3"
                  value={formData.option3}
                  onChange={handleInputChange}
                  placeholder="Option 3"
                  required
                />
                <input
                  type="text"
                  name="option4"
                  value={formData.option4}
                  onChange={handleInputChange}
                  placeholder="Option 4"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer *</label>
              <select
                id="correctAnswer"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Correct Option --</option>
                <option value={formData.option1} disabled={!formData.option1}>
                  {formData.option1 || "Option 1"}
                </option>
                <option value={formData.option2} disabled={!formData.option2}>
                  {formData.option2 || "Option 2"}
                </option>
                <option value={formData.option3} disabled={!formData.option3}>
                  {formData.option3 || "Option 3"}
                </option>
                <option value={formData.option4} disabled={!formData.option4}>
                  {formData.option4 || "Option 4"}
                </option>
              </select>
              <small>
                ⚠️ First fill in the options above, then select the correct
                answer
              </small>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "➕ Add Question"}
            </button>
          </form>
        </div>
      )}

      {/* VIEW QUESTIONS TAB */}
      {activeTab === "view" && (
        <div className="view-questions">
          <h2>All Questions ({questions.length})</h2>
          {loading ? (
            <div className="loading">Loading questions...</div>
          ) : questions.length === 0 ? (
            <div className="no-questions">
              <p>📭 No questions found. Add some questions to get started!</p>
            </div>
          ) : (
            <div className="questions-list">
              {questions.map((question, index) => (
                <div key={question._id} className="question-card">
                  <div className="question-header">
                    <span className="question-number">Q{index + 1}</span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(question._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                  <p className="question-statement">{question.statement}</p>
                  <div className="question-options">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`option ${
                          option === question.correctAnswer ? "correct" : ""
                        }`}
                      >
                        <span className="option-label">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className="option-text">{option}</span>
                        {option === question.correctAnswer && (
                          <span className="correct-badge">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizAdmin;
