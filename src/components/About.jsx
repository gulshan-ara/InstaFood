import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("parent mounted");
  }

  render() {
    return (
      <div>
        <h1>Hi, I'm the About page!!</h1>
        <UserClass />
      </div>
    );
  }
}

export default About;
