import React from "react";
import ReactDOM from "react-dom/client";

// create a react element - means the h1 or other html tags
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello world from React - 101"
);

// nested react elements for nested tags
const parent = React.createElement(
  "div",
  { id: "parent" },
  // siblings
  [
    React.createElement("div", { id: "child1" }, [
      React.createElement(
        "h1",
        { id: "heading" },
        "I'm a nested React element"
      ),
      React.createElement(
        "h2",
        { id: "sub-heading" },
        "I'm the sibling of the heading in a nested React element"
      ),
    ]),
    React.createElement("div", { id: "child2" }, [
      React.createElement(
        "h1",
        { id: "heading2" },
        "I'm a nested React element - 2"
      ),
      React.createElement(
        "h2",
        { id: "sub-heading2" },
        "I'm the sibling of the heading in a nested React element - version 2"
      ),
    ]),
  ]
);
// create the root of React - everything that will render, will render inside this root
const root = ReactDOM.createRoot(document.getElementById("root"));

// render element in root
root.render(parent);
