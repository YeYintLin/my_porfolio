import Layout from "./components/Layouts/Layout";
import About from "./pages/About/About";
import Education from "./pages/Education/Education";
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import WorkExp from "./pages/WorkExperience/WorkExp";

function App() {
  return (
    <div>
      <Layout/>
      <div className="container">
        <About/>
        <Education/>
        <Techstack/>
        <Projects/> 
        <WorkExp/>       
      </div>      
    </div>
  );
}

export default App;
