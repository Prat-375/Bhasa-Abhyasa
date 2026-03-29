import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser, getToken } from "../utils/auth";

function PracticePage() {
  const { level } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const user = getUser();
  const token = getToken();

  useEffect(() => {
    fetch(`http://localhost:5000/api/practice-questions?level=${level}&type=multiple-choice`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, [level]);

  const handleSelect = (questionId, optionText) => {
    setAnswers({
      ...answers,
      [questionId]: optionText,
    });
  };

  const handleSubmit = async () => {
    let correct = 0;

    questions.forEach((q) => {
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (answers[q._id] === correctOption?.text) {
        correct++;
      }
    });

    const total = questions.length;
    const score = Math.round((correct / total) * 100);

    setResult({ correct, total, score });

    if (!user) {
      alert("Please login first");
      return;
    }

    // 🔥 send to backend
    await fetch("http://localhost:5000/api/progress/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
        level,
        theme: questions[0]?.theme?._id,
        type: "multiple-choice",
        totalQuestions: total,
        correctAnswers: correct,
      }),
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="content-section">
      <h1>{level} Practice</h1>

      {questions.map((q) => (
        <div key={q._id} className="question-card">
          <h3>{q.questionText}</h3>

          {q.options.map((opt) => (
            <button
              key={opt.text}
              className={`option-btn ${
                answers[q._id] === opt.text ? "selected" : ""
              }`}
              onClick={() => handleSelect(q._id, opt.text)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {result && (
        <div className="result-box">
          <h2>Result</h2>
          <p>
            {result.correct} / {result.total}
          </p>
          <p>Score: {result.score}%</p>
        </div>
      )}
    </section>
  );
}

export default PracticePage;