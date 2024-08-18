import React from "react";
import ReactDOM from "react-dom/client";

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

const Header = () => {
  return (
    <div className="header">
      <div>
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ2aT1ZYtozvj5xLlh6bw3Yg_D_eXEO8g6Eg&s" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurantCard = () => {
  return (
    <div className="res-card">
      <h3>Meghna Foods</h3>
    </div>
  );
};

const BodyContainer = () => {
  return (
    <div className="body-container">
      <div className="search-container">
        <input className="search" placeholder="Search for Restaurants..." />
      </div>
      <div className="res-container">
        <RestaurantCard />
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <BodyContainer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
