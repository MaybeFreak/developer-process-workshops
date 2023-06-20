import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) formatOpeningHours();
  }, [data]);

  const fetchData = async () => {
    const data = await fetch(`http://localhost:4000/places/${id}`)
      .then((res) => res.json())
      .then((res) => res.data);
    setData(data);
  };

  const formatOpeningHours = () => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    let test = {};
    for (let i = 0; i < days.length; i++) {
      data.openingHours.days[days[i]]
        ? (test[days[i]] = {
            isOpen: true,
            hours: converHoursToString(data.openingHours.days[days[i]]),
          })
        : (test[days[i]] = { isOpen: false });
    }
    let groups = buildGroups(test, days);
    setGroups(groups);
  };

  const converHoursToString = (hours) => {
    let res;
    hours.forEach((entry, i) => {
      if (i === 0) res = `${entry.start} - ${entry.end}`;
      else res += `, ${entry.start} - ${entry.end}`;
    });
    return res;
  };

  const buildGroups = (data, days) => {
    let res;
    let numOfGroups = 1;
    for (let i = 0; i < days.length; i++) {
      if (i === 0) {
        res = [
          {
            from: days[i],
            to: days[i],
            hours:
              data[days[i]].hours === undefined
                ? "Closed"
                : data[days[i]].hours,
          },
        ];
      } else if (data[days[i]].hours === data[days[i - 1]].hours) {
        res[numOfGroups - 1].to = days[i];
      } else {
        res.push({
          from: days[i],
          to: days[i],
          hours:
            data[days[i]].hours === undefined ? "Closed" : data[days[i]].hours,
        });
        numOfGroups++;
      }
    }
    return res;
  };

  return data ? (
    <div>
      <div>
        <h1>{data.name}</h1>
        <p>
          {data.address.street} {data.address.house_number},{" "}
          {data.address.zipcode} {data.address.city}
        </p>
      </div>
      <div>
        <h2>Opening Hours</h2>
        <ul id="OpeningHours">
          {groups?.map((group, i) => (
            <li key={i}>
              <p>
                {group.from !== group.to
                  ? `${group.from} - ${group.to}`
                  : `${group.from}`}
              </p>
              <div>
                {group.hours.split(",").map((timeSlot, i) => (
                  <p key={i}>{timeSlot}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PlacePage;
