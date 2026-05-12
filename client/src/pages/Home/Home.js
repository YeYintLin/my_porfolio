import React from 'react';
import Typewriter from 'typewriter-effect'
import Resume from '../../assets/docs/resume.txt'
import './home.css';

const Home = () => {
  return (
    <>
        <div id="home" className="container-fluid home-container">
          <div className="container home-content">
            <h2>Hi 👋 I'm Ye Yint Lin</h2>
            <h1>
              <Typewriter
                options={{
                  strings:[
                    "FullStack Developer !",
                    "Mern Stack Developer !",
                    "React Native Developer !"
                  ],
                  autoStart:true,
                  loop:true,
                }}
              />        
            </h1>
            <div className="home-buttons">
                <button className='btn btn-hire'>Hire Me</button>
                <a className='btn btn-cv' href={Resume} download="ye_yint_lin.pdf">My Resume</a>
            </div>
          </div>
        </div>
    </>
  )
}

export default Home
