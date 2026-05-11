import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
        <div className="row">
            <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
                <img
                    src="https://cdn.download.ams.birds.cornell.edu/api/v2/asset/612763581/900" 
                    alt="profile_pic" 
                />
            </div>
            <div className="col-md-6 about-content">
                <h1>About me</h1>
                <p>
                    Hi, I’m Ye Yint Lin — a Mechatronics Engineering student and aspiring Full Stack Developer. I enjoy building modern web applications, exploring new technologies, and solving real-world problems through software. Most of my work focuses on the MERN stack, TypeScript, and backend development, and I’m always looking for ways to improve my skills and create better projects.                                   
                </p>
            </div>
        </div>
    </div>
  )
}

export default About