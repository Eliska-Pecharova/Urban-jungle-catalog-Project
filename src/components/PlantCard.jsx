import "./PlantCard.css";
import monsteraReal from "../images/monstera.webp";
import pileaReal from "../images/pilea.webp";
import sansevieriaReal from "../images/sansevieria.jpg";
import calatheaReal from "../images/calathea.jpg";

// Static plant card section displayed on the Home page
const PlantCard = ({ name, image, description }) => {
  return (
    <div className="plant-cards-wrapper">
      {/* Monstera card */}
      <div className="plant-card">
        <img
          src={monsteraReal}
          alt="Monstera deliciosa"
          className="plant-image"
        />
        <h3 className="plant-name">Monstera deliciosa</h3>
        <p className="plant-description">
          The king of the urban jungle. Easy to care for, loves light.
        </p>
      </div>

      {/* Pilea card */}
      <div className="plant-card">
        <img
          src={pileaReal}
          alt="Pilea peperomioides"
          className="plant-image"
        />
        <h3 className="plant-name">Pilea peperomioides</h3>
        <p className="plant-description">
          A money plant that grows quickly and looks adorable.
        </p>
      </div>

      {/* Sansevieria card */}
      <div className="plant-card">
        <img
          src={sansevieriaReal}
          alt="Sansevieria trifasciata"
          className="plant-image"
        />
        <h3 className="plant-name">Sansevieria trifasciata</h3>
        <p className="plant-description">
          The snake plant – it's almost indestructible.
        </p>
      </div>

      {/* Calathea card */}
      <div className="plant-card">
        <img
          src={calatheaReal}
          alt="Calathea orbifolia"
          className="plant-image"
        />
        <h3 className="plant-name">Calathea orbifolia</h3>
        <p className="plant-description">
          Gorgeous leaves that look as if they were painted.
        </p>
      </div>
    </div>
  );
};

export default PlantCard;
