import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LiveFeed from "../Feed/LiveFeed";

function Home() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <LiveFeed />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Home;
