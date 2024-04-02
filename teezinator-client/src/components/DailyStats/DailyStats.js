import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import axios from "../../axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";

const DailyStats = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchDailyStats();
  }, []);

  const fetchDailyStats = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("stats/getTotalDailyStatsByUser");
      const data = response.data;
      const statsArray = Object.entries(data).map(([day, totalTeaDrank]) => ({
        day,
        totalTeaDrank,
      }));
      setDailyStats(statsArray);

      const maxStatValue = Math.max(
        ...statsArray.map((stat) => stat.totalTeaDrank)
      );
      setMaxValue(maxStatValue);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const calculateWidthPercentage = (totalTeaDrank) => {
    if (maxValue === 0) return "0%";
    return `${(totalTeaDrank / maxValue) * 100}%`;
  };

  if (loading) {
    // Conditional rendering based on loading state
    return (
      <div className="lifetime-stats-container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            backgroundColor: "#1c1c1c",
            borderRadius: "5px",
            padding: "25px",
            width: "100%",
          }}
        >
          <p style={{ margin: "30px", color: "white" }}>Loading</p>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div style={{ width: "95%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          height: "auto",
          backgroundColor: "#1c1c1c",
          borderRadius: "5px",
          padding: "25px",
          width: "100%",
        }}
      >
        {dailyStats.map((dailyStat, index) => (
          <div
            className="stats-row-container"
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                width: "100px",
                textAlign: "right",
                textWrap: "nowrap",
              }}
            >
              {dailyStat.day}
            </p>
            <div className="stats-bar-container">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  width: calculateWidthPercentage(dailyStat.totalTeaDrank),
                  backgroundColor: "grey",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black",
                  marginLeft: "10px",
                }}
              >
                <span
                  style={{
                    marginLeft: "15px",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  {dailyStat.totalTeaDrank}
                </span>
              </Box>
            </div>
            <Button
              color="inherit"
              href={`/day?day=${dailyStat.day}`}
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                margin: "0 10px",
                padding: "10px 15px",
                boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap", // Prevents text from wrapping to a new line
              }}
            >
              See more
            </Button>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default DailyStats;
