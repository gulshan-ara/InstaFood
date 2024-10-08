import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import RestaurantContainer from "./components/RestaurantContainer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
import ResMenu from "./components/ResMenu";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Cart from "./components/Cart";
import ShimmerUI from "./components/Shimmer";
import Login from "./components/Login";
import { useLocation } from "react-router-dom";

let About = lazy(() => import("../src/components/About"));

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Provider store={appStore}>
      <div className="app">
        {!isLoginPage && <Header />}
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
          <Suspense fallback={<ShimmerUI />}>
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
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
