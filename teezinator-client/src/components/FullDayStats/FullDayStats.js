import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSearchParams } from "react-router-dom";
import DailyStatsInfo from "../DailyStatsInfo/DailyStatsInfo";
import axios from "../../axiosInstance";
import { useEffect, useState } from "react";
import DayStats from "../DayStats/DayStats";

const FullWeekStats = () => {
  const [searchParams] = useSearchParams();
  const [dailyStats, setDailyStats] = useState({});
  const [teas, setTeas] = useState([]);

  // Get the 'week' query parameter from the URL
  const day = searchParams.get("day");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch daily stats
        const dailyStatsResponse = await axios.get(`/stats/daily?day=${day}`);
        setDailyStats(dailyStatsResponse.data);

        // Since all IDs are unique, directly extract them from the response
        const uniqueTeaIds = Object.keys(dailyStatsResponse.data).join(",");

        // Fetch teas by their IDs if there are any unique IDs
        if (uniqueTeaIds) {
          const teasResponse = await axios.get(
            `/tea/getMultipleById?ids=${uniqueTeaIds}`,
            {}
          );
          setTeas(teasResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [day]);

  console.log("dailyStats", dailyStats);

  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: "100px",
        }}
      >
        <DailyStatsInfo day={day} />
        <DayStats key={day} day={day} teas={teas} teaStats={dailyStats} />
      </div>
      <Footer />
    </div>
  );
};

export default FullWeekStats;
