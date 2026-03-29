import { useEffect, useState } from "react";
import LevelCard from "../components/LevelCard";

function HomePage() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/levels`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch levels");
        }
        return res.json();
      })
      .then((data) => {
        setLevels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Levels fetch error:", err);
        setError("Could not load levels.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1>Select your level</h1>
      </div>

      {loading && <p>Loading levels...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && levels.length === 0 && (
        <p>No levels found.</p>
      )}

      <div className="card-grid">
        {levels.map((level) => (
          <LevelCard key={level._id} level={level} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;