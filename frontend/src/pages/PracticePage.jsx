import { useEffect, useState } from "react";
import { useParams } from "react-router";

function PracticePage() {
  const { level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `http://localhost:5000/api/practice-questions?level=${level}`;

    if (questionType !== "all") {
      url += `&type=${questionType}`;
    }

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching practice questions:", error);
        setLoading(false);
      });
  }, [level, questionType]);

  return (
    <section className="content-section">
      <p className="eyebrow">Practice Mode</p>
      <h1>{level} Practice</h1>
      <p className="section-text">
        Choose a practice type and work with real questions from the database.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="fill-in-the-blank">Fill in the Blank</option>
          <option value="writing">Writing</option>
        </select>
      </div>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p>No practice questions found for this selection yet.</p>
      ) : (
        <div className="list-block">
          {questions.map((question) => (
            <div key={question._id} className="list-item">
              <div>
                <h3>{question.questionText}</h3>
                <p>Type: {question.type}</p>
                {question.theme?.title && <p>Theme: {question.theme.title}</p>}
                {question.instructions && <p>{question.instructions}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PracticePage;