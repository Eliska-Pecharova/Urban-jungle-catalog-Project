import PlantCard from "./PlantCard";
import plantData from "../plantData";

const PlantCardList = ({ activeTab }) => {
  const filteredPlants = plantData.filter((plant) =>
    plant.categories.includes(activeTab),
  );

  return (
    <div className="plant-cards-wrapper">
      {filteredPlants.map((plant) => (
        <PlantCard
          key={plant.id}
          name={plant.name}
          image={plant.image}
          description={plant.description}
        />
      ))}
    </div>
  );
};

export default PlantCardList;
