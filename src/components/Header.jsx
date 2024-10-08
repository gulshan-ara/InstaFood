import { useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";

const Header = () => {
  const cartData = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between align-middl bg-slate-50 shadow-lg rounded-md">
      <div>
        <img className="w-20 h-20 rounded-full mx-20 my-5" src={LOGO_URL} />
      </div>
      <div>
        <ul className="flex justify-between m-8">
          <li className="px-8 py-4 font-medium text-lg hover:text-green-800">
            <Link to="/">Home</Link>
          </li>
          <li className="px-8 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-8 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-8 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/cart">
              Cart <sup>({cartData.length}) </sup>
            </Link>
          </li>
          <li className="px-8 py-4 font-medium text-lg  hover:text-green-800">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
