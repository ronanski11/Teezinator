import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LifeTimeStats from "../LifetimeStats/LifeTimeStats";
import WeeklyStats from "../WeeklyStats/WeeklyStats";
import DailyStats from "../DailyStats/DailyStats";

const Stats = () => {
  // State to toggle between DailyStats and WeeklyStats
  const [selectedStats, setSelectedStats] = useState("daily");

  // Styles
  const selectedStyle = { color: "white", cursor: "pointer", margin: "10px" };
  const notSelectedStyle = { color: "grey", cursor: "pointer", margin: "10px" };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "5%",
          marginTop: "100px",
        }}
      >
        <div style={{ width: "50%" }}>
          <div className="lifetime-stats-container">
            <h1 style={{ margin: "10px", marginLeft: "20px" }}>
              Lifetime stats
            </h1>
            <LifeTimeStats />
          </div>
        </div>
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <div className="lifetime-stats-container">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              {/* Titles for toggling views */}
              <h1
                onClick={() => setSelectedStats("daily")}
                style={
                  selectedStats === "daily" ? selectedStyle : notSelectedStyle
                }
              >
                Day Stats
              </h1>
              <h1 style={selectedStyle}>|</h1>

              <h1
                onClick={() => setSelectedStats("weekly")}
                style={
                  selectedStats === "weekly" ? selectedStyle : notSelectedStyle
                }
              >
                Weekly Stats
              </h1>
            </div>
            {/* Conditional rendering based on state */}
            <div
              style={{ display: selectedStats === "daily" ? "block" : "none" }}
            >
              <DailyStats />
            </div>
            <div
              style={{ display: selectedStats === "weekly" ? "block" : "none" }}
            >
              <WeeklyStats />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Stats;
