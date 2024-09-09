import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div>
      <h1>Hi, I'm the About page!!</h1>
      <User name="Gulshan" location="Dhaka" contact="@gulshan3015" />
      <UserClass name="Gulshan Class" location="Dhaka" contact="@gulshan3015" />
    </div>
  );
};

export default About;
