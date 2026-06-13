import Layout from "./components/Layouts/Layout";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Education/Education";
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import Testimonial from "./pages/Testimonial/Testimonial";
import WorkExp from "./pages/WorkExperience/WorkExp";
 
function App() {
  return (
    <Layout>
      <About/>
      <Education/>
      <Techstack/>
      <Projects/>
      <WorkExp/>
      <Testimonial/>
      <Contact/>
    </Layout>
  );
}

export default App;
