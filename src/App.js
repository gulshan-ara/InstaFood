import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { resData } from "./resData";

// const heading = React.createElement("h1", {}, "Hello World");
/**
 * Header
 * --- Logo
 * --- Nav Items
 * Body
 * --- Search
 * --- RestaurantContainer
 * --- ReataurantCard
 * -------- Img
 * -------- Name of Res, star rating, cuisine etc
 * Footer
 * --- Copyright
 * --- Links
 * --- Address
 * --- Contact
 */

const RestaurantContainer = () => {
  return (
    <div className="body-container">
      <div className="search-container">
        <input className="search" placeholder="Search for Restaurants..." />
      </div>
      <div className="res-container">
        {resData.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.info.id} resInfo={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <RestaurantContainer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
