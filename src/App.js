import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <Home />
      
      <About />
      <Portfolio />
      <Experience />
      <Contact />
      <SocialLinks />
      {/* <Footer /> */}
    </div>
  );
}

export default App;