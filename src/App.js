import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import RestaurantContainer from "./components/RestaurantContainer";

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
