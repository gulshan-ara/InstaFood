import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import RestaurantContainer from "./components/RestaurantContainer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import ResMenu from "./components/ResMenu";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Cart from "./components/Cart";
import ShimmerUI from "./components/Shimmer";

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

let About = lazy(() => import("../src/components/About"));

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
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
        element: (
          <Suspense fallback={ShimmerUI}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        // :resId - dynamic value of restaurant id
        path: "/restaurants/:resId",
        element: <ResMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
