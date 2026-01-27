import { useEffect, useState } from "react";
import "./Header.css";
import vines from "../images/vine.png";

const quotes = [
  "Plants make a house feel like home.",
  "Every plant has its own story.",
  "Urban Jungle: green therapy for everyday life.",
];

const Header = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const savedIndex = Number(localStorage.getItem("quoteIndex")) || 0;
    setQuote(quotes[savedIndex]);
    const nextIndex = (savedIndex + 1) % quotes.length;
    localStorage.setItem("quoteIndex", nextIndex);
  }, []);

  return (
    <header className="header">
      <img src={vines} alt="Vines" className="vines" />
      <h1 className="header-title">Bring the outdoors in.</h1>
      <p className="header-quote">{quote}</p>
    </header>
  );
};

export default Header;
