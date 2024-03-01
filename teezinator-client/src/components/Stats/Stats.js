import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";

const TeaStats = () => {
  const [teaStats, setTeaStats] = useState(null);

  useEffect(() => {
    // Function to decode the JWT token and extract the username
    const getUsernameFromToken = () => {
      const token = localStorage.getItem("TeezinatorToken");
      if (!token) return null;
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        return JSON.parse(jsonPayload).sub; // Assuming the payload has a username field
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };

    const username = getUsernameFromToken();
    if (!username) {
      console.error("Username not found in token");
      return;
    }

    axios
      .get("http://localhost:8080/api/tea/getAllStatsByUser", {
        params: {
          username: username,
        },
      })
      .then((response) => {
        setTeaStats(response.data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);

  if (!teaStats) return <div>Loading...</div>;
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h2>Tea Stats</h2>
      <h3>Tea Numbers</h3>
      <ul>
        {Object.entries(teaStats.teaNumbers).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h3>Tea Numbers Per Week</h3>
      {Object.entries(teaStats.teaNumbersPerWeek).map(([week, records]) => (
        <div key={week}>
          <h4>Week {week}</h4>
          <ul>
            {Object.entries(records).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h3>Tea Numbers Per Day</h3>
      {Object.entries(teaStats.teaNumbersPerDay).map(([date, records]) => (
        <div key={date}>
          <h4>{date}</h4>
          <ul>
            {Object.entries(records).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default TeaStats;
