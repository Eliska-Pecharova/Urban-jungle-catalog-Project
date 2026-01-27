import "./PlantCard.css";

const PlantCard = ({ name, image, description }) => {
  return (
    <div className="plant-card">
      <img src={image} alt={name} className="plant-image" />
      <h3 className="plant-name">{name}</h3>
      <p className="plant-description">{description}</p>
    </div>
  );
};

export default PlantCard;
