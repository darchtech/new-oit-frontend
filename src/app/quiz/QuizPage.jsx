import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./QuizPage.css";

// Hardcoded API URL to ensure it works
const API_BASE_URL = "http://localhost:5000/api";

const QuizPage = () => {
  const { quizId: urlQuizId } = useParams(); // Get quiz ID from URL params
  const quizIdToUse = urlQuizId || "default-quiz"; // Fallback if no ID provided

  // Registration state
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    college: "",
    location: "",
  });
  const [registrationLoading, setRegistrationLoading] = useState(false);

  // Quiz state
  const [quiz, setQuiz] = useState(null);
  const [activeQuizId, setActiveQuizId] = useState(null); // Store active quiz ID from backend
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // Result state
  const [result, setResult] = useState(null);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "10:00"; // Default fallback
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    // Ensure both minutes and seconds are always 2 digits
    const minsStr = mins.toString().padStart(2, "0");
    const secsStr = secs.toString().padStart(2, "0");
    return `${minsStr}:${secsStr}`;
  };

  // Get score message styling
  const getScoreStyle = (level) => {
    switch (level) {
      case "excellent":
        return "score-excellent";
      case "good":
        return "score-good";
      case "average":
        return "score-average";
      case "below_average":
        return "score-below-average";
      case "poor":
        return "score-poor";
      default:
        return "";
    }
  };

  // Handle registration input change
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Register for quiz
  const registerHandler = async (e) => {
    e.preventDefault();
    setRegistrationLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz-registration/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId: quizIdToUse,
            ...registrationData,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setIsRegistered(true);
      // Auto-start quiz after registration
      startQuizHandler();
    } catch (err) {
      setError(err.message);
    } finally {
      setRegistrationLoading(false);
    }
  };

  // Start quiz
  const startQuizHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz/start-quiz/${quizIdToUse}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      console.log("Quiz start response:", data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || "Failed to start quiz");
      }

      setQuiz(data);
      setActiveQuizId(data.quiz_id); // Store quiz ID
      setCurrentQuestion(data.question);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setTimeRemaining(Number(data.timeRemaining) || 600); // Ensure it's a number with fallback
      setStartTime(new Date(data.startTime));
      setQuizStarted(true);
      console.log("Time remaining set to:", data.timeRemaining); // Debug log
    } catch (err) {
      setError(err.message);
      console.error("Start quiz error:", err); // Debug log
    } finally {
      setLoading(false);
    }
  }, [quizIdToUse]);

  // Submit answer
  const submitAnswerHandler = async () => {
    if (!activeQuizId) {
      setError("Quiz ID not found");
      return;
    }
    if (!selectedAnswer || isAnswered) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz/submit-answer/${activeQuizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_id: currentQuestion._id,
            selectedAnswer,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit answer");
      }

      // Check if quiz was submitted (all questions answered or time expired)
      if (data.score !== undefined || data.isTimeExpired) {
        setResult(data);
        setQuizSubmitted(true);
      } else {
        // Move to next question
        setCurrentQuestion(data.nextQuestion);
        setQuestionNumber(data.questionNumber);
        setTimeRemaining(data.timeRemaining);
      }

      setSelectedAnswer(null);
      setIsAnswered(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manually submit quiz
  const submitQuizHandler = async () => {
    if (!activeQuizId) {
      setError("Quiz ID not found");
      return;
    }
    if (!window.confirm("Are you sure you want to submit the quiz?")) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz/submit-quiz/${activeQuizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit quiz");
      }

      setResult(data);
      setQuizSubmitted(true);

      // Save score to registration
      if (registrationData.email) {
        try {
          await fetch(`${API_BASE_URL}/quiz-registration/update-score`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quizId: activeQuizId,
              email: registrationData.email,
              score: data.score,
            }),
          });
        } catch (scoreErr) {
          console.error("Failed to save score:", scoreErr);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch time remaining periodically
  const fetchTimeRemaining = useCallback(async () => {
    if (!activeQuizId || quizSubmitted) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/quiz/time-remaining/${activeQuizId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.isTimeExpired && !quizSubmitted) {
        // Time expired, fetch final results
        const resultResponse = await fetch(
          `${API_BASE_URL}/quiz/submit-quiz/${activeQuizId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const resultData = await resultResponse.json();
        setResult(resultData);
        setQuizSubmitted(true);
      } else {
        setTimeRemaining(data.timeRemaining);
      }
    } catch (err) {
      console.error("Error fetching time:", err);
    }
  }, [quiz, quizSubmitted]);

  // Timer effect - countdown locally
  useEffect(() => {
    if (!quizStarted || quizSubmitted || !timeRemaining) return;

    // Update timer every second
    const timerInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - submit quiz
          submitQuizHandler();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [quizStarted, quizSubmitted, timeRemaining]);

  // Prevent text selection, right-click, and keyboard shortcuts
  useEffect(() => {
    if (!quizStarted || quizSubmitted) return;

    const preventCopy = (e) => {
      e.preventDefault();
      return false;
    };

    const preventKeyDown = (e) => {
      // Prevent Ctrl+C, Ctrl+X, Ctrl+P, Ctrl+S
      if (e.ctrlKey && ["c", "x", "p", "s"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", preventCopy);
    document.addEventListener("selectstart", preventCopy);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCopy);
    document.addEventListener("keydown", preventKeyDown);

    // Add no-select class to body
    document.body.classList.add("quiz-no-select");

    return () => {
      document.removeEventListener("contextmenu", preventCopy);
      document.removeEventListener("selectstart", preventCopy);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCopy);
      document.removeEventListener("keydown", preventKeyDown);
      document.body.classList.remove("quiz-no-select");
    };
  }, [quizStarted, quizSubmitted]);

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  // Render registration form
  if (!isRegistered) {
    return (
      <div className="quiz-container">
        <div className="quiz-registration-screen">
          <h1>Quiz Registration</h1>
          <p className="registration-subtitle">
            Fill in your details to start the quiz
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={registerHandler} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registrationData.name}
                  onChange={handleRegistrationChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={registrationData.phone}
                  onChange={handleRegistrationChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="class">Class/Year *</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={registrationData.class}
                  onChange={handleRegistrationChange}
                  placeholder="e.g., TY BSc, SY BCom, etc."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="college">College Name *</label>
              <input
                type="text"
                id="college"
                name="college"
                value={registrationData.college}
                onChange={handleRegistrationChange}
                placeholder="Enter your college name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location/City *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={registrationData.location}
                onChange={handleRegistrationChange}
                placeholder="Enter your city/location"
                required
              />
            </div>

            <div className="registration-info">
              <p>
                ⏱️ <strong>Quiz Duration:</strong> 10 minutes
              </p>
              <p>
                📝 <strong>Total Questions:</strong> 10
              </p>
              <p>
                ✅ <strong>Format:</strong> One question at a time
              </p>
            </div>

            <button
              type="submit"
              className="start-btn"
              disabled={registrationLoading}
            >
              {registrationLoading
                ? "Registering..."
                : "Register & Start Quiz →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render start screen
  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-start-screen">
          <h1>Quiz Instructions</h1>
          <div className="instructions">
            <p>
              ⏱️ <strong>Duration:</strong> 10 minutes
            </p>
            <p>
              📝 <strong>Questions:</strong> {totalQuestions || 10} questions
            </p>
            <p>
              ✅ <strong>Format:</strong> One question at a time
            </p>
            <p>
              🚫 <strong>Rules:</strong>
            </p>
            <ul>
              <li>You cannot go back to previous questions</li>
              <li>Text selection and copying is disabled</li>
              <li>Quiz will auto-submit after 10 minutes</li>
            </ul>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            className="start-btn"
            onClick={startQuizHandler}
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Quiz"}
          </button>
        </div>
      </div>
    );
  }

  // Render result screen
  if (quizSubmitted && result) {
    return (
      <div className="quiz-container">
        <div className="quiz-result-screen">
          <h1>Quiz Submitted!</h1>

          <div className={`score-card ${getScoreStyle(result.scoreLevel)}`}>
            <div className="score-circle">
              <span className="score">{result.score}</span>
              <span className="total">/ {result.totalQuestions}</span>
            </div>
            <div className="score-percentage">{result.percentage}%</div>
          </div>

          <div className="score-message-box">
            <p className="result-message">{result.scoreMessage}</p>
          </div>

          <div className="stats-grid">
            <div className="stat-item correct">
              <span className="stat-value">{result.correctCount}</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-item wrong">
              <span className="stat-value">{result.wrongCount}</span>
              <span className="stat-label">Wrong</span>
            </div>
            <div className="stat-item unanswered">
              <span className="stat-value">{result.unansweredCount}</span>
              <span className="stat-label">Unanswered</span>
            </div>
            <div className="stat-item attempted">
              <span className="stat-value">{result.attemptedCount}</span>
              <span className="stat-label">Attempted</span>
            </div>
          </div>

          {result.isTimeExpired && (
            <div className="time-expired-notice">
              ⏰ Time's up! Quiz was auto-submitted.
            </div>
          )}

          <div className="submitted-at">
            Submitted at: {new Date(result.submittedAt).toLocaleString()}
          </div>
        </div>
      </div>
    );
  }

  // Render quiz question
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-info">
          <span className="question-counter">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className={`timer ${timeRemaining < 60 ? "timer-warning" : ""}`}>
          ⏱️ {formatTime(timeRemaining)}
        </div>
        <button
          className="submit-quiz-btn"
          onClick={submitQuizHandler}
          disabled={loading}
        >
          Submit Quiz
        </button>
      </div>

      <div className="quiz-body">
        {error && <div className="error-message">{error}</div>}

        <div className="question-card">
          <h2 className="question-text">{currentQuestion?.statement}</h2>

          <div className="options-list">
            {currentQuestion?.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <span className="option-marker">
                  {selectedAnswer === option ? "🔘" : "⚪"}
                </span>
                <span className="option-text">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quiz-footer">
        <button
          className="next-btn"
          onClick={submitAnswerHandler}
          disabled={!selectedAnswer || loading || isAnswered}
        >
          {loading
            ? "Submitting..."
            : questionNumber === totalQuestions
              ? "Finish Quiz"
              : "Next Question →"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
