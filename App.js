import React from "react";
import ReactDOM from "react-dom/client";
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

const Header = () => {
  return (
    <div className="header">
      <div>
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ2aT1ZYtozvj5xLlh6bw3Yg_D_eXEO8g6Eg&s"
        />
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

const RestaurantCard = (props) => {
  const { resInfo } = props;

  return (
    <div className="res-card">
      <img
        className="res-card-logo"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resInfo.info.cloudinaryImageId}`}
        alt="image"
      />
      <div className="res-card-info">
        <h3 className="res-card-title">{resInfo.info.name}</h3>
        <p className="res-card-rating">
          ⭐️ {resInfo.info.avgRatingString} - {resInfo.info.sla.slaString}
        </p>
        <p>{resInfo.info.cuisines.join(", ")}</p>
      </div>
    </div>
  );
};

const RestaurantContainer = () => {
  return (
    <div className="body-container">
      <div className="search-container">
        <input className="search" placeholder="Search for Restaurants..." />
      </div>
      <div className="res-container">
        {resData.map((i) => {
          return <RestaurantCard key={i.info.id} resInfo={i} />;
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
