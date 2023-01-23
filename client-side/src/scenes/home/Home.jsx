import React from "react";
import TopCarousel from "./TopCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <div className="home">
      <TopCarousel />
      <ShoppingList />
      <Subscribe />
    </div>
  );
};

export default Home;
