import Layout from "./components/Layouts/Layout";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Education/Education";
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import Testimonial from "./pages/Testimonial/Testimonial";
import WorkExp from "./pages/WorkExperience/WorkExp";
import { ThemeProvider } from "./context/ThemeContext";
 
function App() {
  return (
    <ThemeProvider>
      <Layout>
        <About/>
        <Education/>
        <Techstack/>
        <Projects/>
        <WorkExp/>
        <Testimonial/>
        <Contact/>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
