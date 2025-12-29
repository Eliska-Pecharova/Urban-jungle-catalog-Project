import Header from "../components/Header";
import PlantCard from "../components/PlantCard";
import Tabs from "../components/Tabs";

const Home = () => {
  return (
    <main className="home-page">
      <Header />
      <PlantCard />
      <Tabs />
    </main>
  );
};

export default Home;
