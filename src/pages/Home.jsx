import Header from "../components/Header";
import PlantCardList from "../components/PlantCardList";
import Tabs from "../components/Tabs";
import { useState } from "react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Beginner");

  return (
    <div className="home-page">
      <Header />
      <PlantCardList activeTab={activeTab} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Home;
