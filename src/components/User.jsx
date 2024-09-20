import { useEffect, useState } from "react";

const User = () => {
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchUserDetails();
      setUserData(fetchedData);
    };

    fetchData();

    // Clean up useEffect
    return () => {};
  }, []);

  const fetchUserDetails = async () => {
    const data = await fetch("https://api.github.com/users/gulshan-ara");
    const json = await data.json();
    return json;
  };

  return (
    <div className="bg-red-100 w-96 mx-auto my-48 px-auto py-20 shadow-2xl flex flex-col items-center justify-center rounded-lg">
      <p className="font-bold text-lg">Hi, I'm {userData.name}.</p>
      <p className="font-normal from-neutral-500">I'm from {userData.location}.</p>
      <p className="font-medium">I'm a {userData.bio}.</p>
    </div>
  );
};

export default User;
