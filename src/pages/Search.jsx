import { useState } from "react";
import "./Search.css";
import noImage from "../images/no-image-icon.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages|extracts|categories&exintro&explaintext&piprop=thumbnail&pithumbsize=300&generator=search&gsrsearch=${query}`,
      );

      const data = await res.json();

      if (!data.query) {
        setResults([]);
        setLoading(false);
        return;
      }

      const pages = Object.values(data.query.pages);

      const plants = pages.map((p) => {
        const categories =
          p.categories?.map((c) => c.title.toLowerCase()) || [];

        const isPlantCategory = categories.some(
          (cat) =>
            cat.includes("plant") ||
            cat.includes("flora") ||
            cat.includes("botany") ||
            cat.includes("species") ||
            cat.includes("taxonomy"),
        );

        return {
          id: p.pageid,
          name: p.title,
          description: p.extract || "No description available.",
          image: p.thumbnail?.source || noImage,
          latin: extractLatinName(p.extract),
          isPlant: isPlantCategory,
        };
      });

      const filtered = plants.filter((p) => p.isPlant);

      setResults(filtered);
      setQuery("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function extractLatinName(text) {
    if (!text) return "Unknown";
    const match = text.match(/\b[A-Z][a-z]+ [a-z]+/);
    return match ? match[0] : "Unknown";
  }

  function shorten(text, max = 180) {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  }

  function toggleExpand(id) {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <main className="search-page">
      <h1>Plant Finder</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a plant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && results.length === 0 && query === "" && (
        <p className="no-results">No plants found. Try another search.</p>
      )}

      <div className="results-grid">
        {results.map((plant) => (
          <div key={plant.id} className="plant-card">
            <img src={plant.image} alt={plant.name} className="plant-img" />

            <h2>{plant.name}</h2>
            <h3>{plant.latin}</h3>

            <p className="desc">
              {expanded[plant.id]
                ? plant.description
                : shorten(plant.description)}
            </p>

            <button
              className="show-more-btn"
              onClick={() => toggleExpand(plant.id)}
            >
              {expanded[plant.id] ? "Show less" : "Show more"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Search;
