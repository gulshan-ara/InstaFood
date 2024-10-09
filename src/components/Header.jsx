import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { userSignOut } from "../utils/firebaseAuth";
import { locations } from "../utils/location";
import LocationCard from "./LocationCard";

const Header = ({ isLoggedIn }) => {
  const cartData = useSelector((store) => store.cart.items);
  const authData = useSelector((store) => store.auth?.email) || null;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState("Ahmedabad, Gujarat, India");
  const isOnline = useOnlineStatus();

  return (
    <div className="flex justify-between align-middl bg-slate-50 shadow-lg rounded-md">
      <div className="flex flex-row justify-around items-center">
        <img
          className="w-20 h-20 rounded-full ml-10 mr-5 my-5"
          src={LOGO_URL}
        />
        <div
          onClick={() => {
            setDrawerOpen(!drawerOpen);
          }}
          className="flex flex-row justify-around items-center bg-slate-200 bg-opacity-40 rounded-full shadow-xl px-5 py-5"
        >
          <p className="mr-3 font-medium">{selectedLoc}</p>
          <p className="font-normal text-gray-400 -tracking-widest">v</p>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center px-20">
        <ul className="flex justify-between m-8">
          <li className="px-5 py-4 font-medium text-lg hover:text-green-800">
            <Link to="/">Home</Link>
          </li>
          <li className="px-5 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-5 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-5 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/cart">
              Cart <sup>({isLoggedIn ? cartData.length : 0}) </sup>
            </Link>
          </li>
          <li className="px-5 py-4 font-medium text-lg  hover:text-green-800">
            {isLoggedIn ? (
              <button
                onClick={async () => {
                  await userSignOut();
                }}
              >
                LogOut
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
        {isLoggedIn && (
          <div className="bg-purple-400 rounded-full px-4 py-2 relative">
            <p className="text-xl font-bold text-white">
              {authData && authData[0].toUpperCase()}
            </p>
            {isOnline ? (
              <span className="bg-green-500 h-3 w-3 rounded-full absolute top-0 right-0 translate-x-1/2 translate-y-1/3"></span>
            ) : (
              <span className="bg-red-500 h-3 w-3 rounded-full absolute top-0 right-0 translate-x-1/2 translate-y-1/3"></span>
            )}
          </div>
        )}
      </div>
      {/* Overlay on open drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(!drawerOpen)}
      ></div>
      {/* drawer UI  */}
      <div
        className={`fixed top-0 left-0 h-full w-96 z-10 bg-white p-4 transform transition-transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Choose a Location</h2>
        <ul>
          {locations.map((loc, index) => {
            return (
              <li key={index}>
                <Link
                  to={`/city/${loc.city}`}
                  onClick={() => {
                    setSelectedLoc(`${loc.city}, ${loc.state}, India`);
                    setDrawerOpen(false);
                  }}
                >
                  <LocationCard
                    city={loc.city}
                    state={loc.state}
                    country={loc.country}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
