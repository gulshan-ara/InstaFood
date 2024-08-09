import React from "react";
import ReactDOM from "react-dom/client";

// const heading = React.createElement("h1", {}, "Hello World");
const Heading = () => <h1>Hello World JSX</h1>;

function SubHeading() {
  return <h3>I'm the SubHeading!!</h3>;
}

const Body = () => {
  return (
    <div>
      <Heading />
      <SubHeading />
      <p> I'm just a lil paragraph.</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);
