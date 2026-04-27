import React, { useEffect } from "react";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import ShootingStar from "./components/ShootingStar";

function App() {
  useEffect(() => {
    document.title = "Christian Earl Turaja — IT & Automation Expert";
  }, []);

  return (
    <div className="bg-[#0a0a0f] w-full min-h-screen text-white overflow-hidden">
      <ShootingStar />
      <NavBar />
      <Home />
      <About />
      <Portfolio />
      <Experience />
      <Contact />
      <SocialLinks />
    </div>
  );
}

export default App;