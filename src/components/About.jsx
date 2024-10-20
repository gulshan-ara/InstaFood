const About = () => {
  return (
    <div className="flex flex-col mx-20 my-10 h-4/6 gap-5 items-start text-justify">
      <h3 className="text-2xl font-semibold mb-4">About InstaFood</h3>
      <p className="mr-96">
        This project was started as part of React.js learning step, but soon it
        ended up being a <strong>full stack project</strong> using
        <strong> React.js, Node.js, Express.js & Firebse</strong>. It has the
        following specialities :
      </p>
      <ul className="list-disc list-inside text-lg ml-4">
        <li>Live API data integration of Swiggy API</li>
        <li>User Authentication</li>
        <li>Dynamic Routing</li>
        <li>Stripe payment integration</li>
        <li>Protected Routing</li>
        <li>Optimised performance due to use of Lazy loading</li>
        <li>CORS handling</li>
      </ul>

      <p>
        Special Thanks to <strong>Akshay Saini</strong> &{" "}
        <strong>namastedev.com</strong>{" "}
        for such amazing explanations of React & Javascript.
      </p>
    </div>
  );
};

export default About;
