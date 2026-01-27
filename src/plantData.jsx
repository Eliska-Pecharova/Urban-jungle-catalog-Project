import monsteraReal from "./images/monstera.webp";
import pileaReal from "./images/pilea.webp";
import sansevieriaReal from "./images/sansevieria.jpg";
import calatheaReal from "./images/calathea.jpg";

const plantData = [
  {
    id: 1,
    name: "Monstera deliciosa",
    image: monsteraReal,
    description: "The king of the urban jungle. Easy to care for, loves light.",
    categories: ["Beginner", "Air Purifying"],
  },
  {
    id: 2,
    name: "Pilea peperomioides",
    image: pileaReal,
    description: "A money plant that grows quickly and looks adorable.",
    categories: ["Beginner", "Pet Friendly"],
  },
  {
    id: 3,
    name: "Sansevieria trifasciata",
    image: sansevieriaReal,
    description: "The snake plant – it's almost indestructible.",
    categories: ["Beginner", "Air Purifying", "Statement Plants"],
  },
  {
    id: 4,
    name: "Calathea orbifolia",
    image: calatheaReal,
    description: "Gorgeous leaves that look as if they were painted.",
    categories: ["Beginner", "Pet Friendly", "Statement Plants"],
  },
];

export default plantData;
