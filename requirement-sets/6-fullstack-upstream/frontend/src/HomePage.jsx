import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/places").then((res) =>
      res.json()
    );
    setData(res.places);
  };

  return (
    <ul>
      {data?.map((place, i) => (
        <li key={i}>
          <NavLink to={`/places/${place}`}>{place}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
