import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { userSignOut } from "../utils/firebaseAuth";

const Header = ({ isLoggedIn }) => {
  const cartData = useSelector((store) => store.cart.items);
  const authData = useSelector((store) => store.auth?.email) || null;
  const isOnline = useOnlineStatus();

  return (
    <div className="flex justify-between align-middl bg-slate-50 shadow-lg rounded-md">
      <div>
        <img className="w-20 h-20 rounded-full mx-20 my-5" src={LOGO_URL} />
      </div>
      <div className="flex flex-row justify-around items-center px-20">
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
    </div>
  );
};

export default Header;
