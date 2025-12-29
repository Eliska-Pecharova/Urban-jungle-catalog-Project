import { useState } from "react";
import "./Search.css";
import noImage from "../images/no-image-icon.png";

const Search = () => {
  // User input (search query)
  const [query, setQuery] = useState("");

  // Filtered plant results
  const [results, setResults] = useState([]);

  // Loading state for API request
  const [loading, setLoading] = useState(false);

  // Track which plant descriptions are expanded
  const [expanded, setExpanded] = useState({});

  async function handleSearch() {
    // Prevent empty search
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      // Wikipedia API request
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages|extracts&exintro&explaintext&piprop=thumbnail&pithumbsize=300&generator=search&gsrsearch=${query}`
      );

      const data = await res.json();

      // No results returned
      if (!data.query) {
        setResults([]);
        setLoading(false);
        return;
      }

      const pages = Object.values(data.query.pages);

      // Map raw Wikipedia pages into plant objects
      const plants = pages
        .map((p) => ({
          id: p.pageid,
          name: p.title,
          description: p.extract || "",
          image: p.thumbnail?.source || noImage, // fallback image
          latin: extractLatinName(p.extract), // extract Latin name
        }))
        // Filter out non-plant results
        .filter((p) => {
          const title = p.name.toLowerCase();
          const q = query.toLowerCase();
          const desc = p.description.toLowerCase();

          // Title must contain the searched word
          const matchesName = title.includes(q);

          // Description must contain plant-related keywords
          const isPlant =
            /plant|flower|species|genus|flora|botany|cultivar|shrub|tree|herb/.test(
              desc
            );

          // Must contain a Latin binomial name
          const hasLatin = /\b[A-Z][a-z]+ [a-z]+/.test(p.description);

          // Exclude "List of..." pages
          const isList = title.startsWith("list of");

          // Exclude people
          const isPerson =
            /was born|is an|was an|actor|actress|singer|politician|writer|player|model|author|poet|musician|director|producer/.test(
              desc
            );

          // Exclude movies, books, series, etc.
          const isMedia =
            /film|movie|novel|series|episode|television|drama|documentary|character/.test(
              desc
            );

          // Exclude names with two capitalized words (usually people/media)
          const hasTwoCapitalWords = /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(p.name);

          // Final filter conditions
          return (
            matchesName &&
            isPlant &&
            hasLatin &&
            !isList &&
            !isPerson &&
            !isMedia &&
            !hasTwoCapitalWords
          );
        });

      // Save filtered results
      setResults(plants);

      // Clear search input after search
      setQuery("");
    } catch (err) {
      console.error("Error loading plants:", err);
    } finally {
      setLoading(false);
    }
  }

  // Extract Latin binomial name from description text
  function extractLatinName(text) {
    if (!text) return "Unknown";
    const match = text.match(/\b[A-Z][a-z]+ [a-z]+/);
    return match ? match[0] : "Unknown";
  }

  // Shorten long descriptions for preview mode
  function shorten(text, max = 180) {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  }

  // Toggle expanded/collapsed description for a plant
  function toggleExpand(id) {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <main className="search-page">
      <h1>Plant Finder</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a plant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Results grid */}
      <div className="results-grid">
        {results.map((plant) => (
          <div key={plant.id} className="plant-card">
            {/* Plant image */}
            {plant.image && (
              <img src={plant.image} alt={plant.name} className="plant-img" />
            )}

            {/* Plant name + Latin name */}
            <h2>{plant.name}</h2>
            <h3>{plant.latin}</h3>

            {/* Description (shortened or full) */}
            <p className="desc">
              {expanded[plant.id]
                ? plant.description
                : shorten(plant.description)}
            </p>

            {/* Expand/collapse button */}
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
