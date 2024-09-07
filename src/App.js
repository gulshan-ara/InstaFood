import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import RestaurantContainer from "./components/RestaurantContainer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

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
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RestaurantContainer />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
