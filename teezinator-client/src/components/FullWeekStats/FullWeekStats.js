import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import DayStats from "../DayStats/DayStats";

// Mock data for the bar chart

const FullWeekStats = () => {
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
        <DayStats />
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default FullWeekStats;
