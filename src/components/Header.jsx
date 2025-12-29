import { useEffect, useState } from "react";
import "./Header.css";
import vines from "../images/vine.png";

// Array of quotes that will rotate in order
const quotes = [
  "Plants make a house feel like home.",
  "Every plant has its own story.",
  "Urban Jungle: green therapy for everyday life.",
];

const Header = () => {
  // State for the currently displayed quote
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // 1) Load the saved index from localStorage
    // If nothing is saved yet, start from 0 (the first quote)
    const savedIndex = Number(localStorage.getItem("quoteIndex")) || 0;

    // 2) Set the quote based on the saved index
    setQuote(quotes[savedIndex]);

    // 3) Calculate the next index (cyclic rotation: 0 → 1 → 2 → 0 → ...)
    const nextIndex = (savedIndex + 1) % quotes.length;

    // 4) Save the next index for the next page reload
    localStorage.setItem("quoteIndex", nextIndex);
  }, []);
  // useEffect runs only once when the component loads

  return (
    <header className="header">
      {/* Decorative vine image in the top-left corner */}
      <img src={vines} alt="Vines" className="vines" />

      {/* Main title */}
      <h1 className="header-title">Bring the outdoors in.</h1>

      {/* Quote that changes on every page reload */}
      <p className="header-quote">{quote}</p>
    </header>
  );
};

export default Header;
