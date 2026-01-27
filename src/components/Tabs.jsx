import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "Beginner",
    "Pet Friendly",
    "Air Purifying",
    "Statement Plants",
  ];

  const tabContent = {
    Beginner: {
      description: "Low maintenance, forgiving, and happy with basic care.",
      plantsName: "Examples of flowers:",
      plants: ["Pothos, ", "Snake Plant, ", "ZZ Plant, ", "Spider Plant"],
    },
    "Pet Friendly": {
      description: "Safe for cats and dogs. No toxic leaves, no drama.",
      plantsName: "Examples of flowers:",
      plants: ["Areca Palm, ", "Calathea, ", "Parlor Palm, ", "Boston Fern"],
    },
    "Air Purifying": {
      description: "These plants clean the air and look good doing it.",
      plantsName: "Examples of flowers:",
      plants: ["Peace Lily, ", "Snake Plant, ", "Rubber Plant, ", "Aloe Vera"],
    },
    "Statement Plants": {
      description:
        "Big, bold, and beautiful. These are the showstoppers of your jungle.",
      plantsName: "Examples of flowers:",
      plants: [
        "Monstera Deliciosa, ",
        "Fiddle Leaf Fig, ",
        "Bird of Paradise, ",
        "Rubber Tree",
      ],
    },
  };

  return (
    <section className="tabs-section">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <h3>{activeTab}</h3>
        <p>{tabContent[activeTab].description}</p>

        <ul className="plant-tab">
          <h4>{tabContent[activeTab].plantsName}</h4>
          <div className="plant-list">
            {tabContent[activeTab].plants.map((plant) => (
              <li key={plant}>{plant}</li>
            ))}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default Tabs;
