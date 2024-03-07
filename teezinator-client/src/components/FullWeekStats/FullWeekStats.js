import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import DayStats from "../DayStats/DayStats";
import { useSearchParams } from "react-router-dom";

const FullWeekStats = () => {
  const [searchParams] = useSearchParams();
  const [weeklyStats, setWeeklyStats] = useState({});
  const [teas, setTeas] = useState([]);

  // Get the 'week' query parameter from the URL
  const week = searchParams.get("week");

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      try {
        const response = await axios.get(`/stats/weekly?week=${week}`);
        setWeeklyStats(response.data);
      } catch (error) {
        console.error("Failed to fetch weekly stats:", error);
      }
    };

    fetchWeeklyStats();

    const fetchTeas = async () => {
      try {
        const response = await axios.get("tea/getall");
        setTeas(response.data);
      } catch (error) {
        console.error("Failed to fetch teas:", error);
      }
    };

    fetchTeas();
  }, [week]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "5%",
        }}
      >
        {Object.entries(weeklyStats).map(([day, stats]) => (
          <DayStats key={day} day={day} teas={teas} teaStats={stats} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FullWeekStats;
