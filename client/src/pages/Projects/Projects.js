import React from 'react';
import './Projects.css';
import ecommerceImg from '../../assets/images/ecommerce_mockup.png';
import jobAppImg from '../../assets/images/job_app_mockup.png';
import iotImg from '../../assets/images/iot_mockup.png';

const Projects = () => {
  return (
    <>
        <div id="projects" className="container-fluid project">
            <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
                TOP RECENT PROJECTS
            </h2>    
            <hr />
            <p className="project-intro pb-3 text-center">
                Here are some of the projects I’ve recently worked on, showcasing my experience with MERN stack development, TypeScript, and real-world application design.
            </p>       
            <div className="row" id="ads">
                <div className="col-md-4">
                    <div className="card rounded">
                        <div className="card-image">
                            <span className="card-notify-badge">Full stack</span>
                            <img 
                                src={ecommerceImg} 
                                alt="MERN E-Commerce Project" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">Node</span>
                            <span className="card-detail-badge">Express</span>
                            <span className="card-detail-badge">React</span>
                            <span className="card-detail-badge">MongoDB</span>
                        </div>
                        <div className="card-body">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    MERN E-Commerce Shopping Platform
                                </h5>
                            </div>
                            <a className="ad-btn" href="https://github.com/YeYintLin/react_project" target="_blank" rel="noreferrer">View Code</a>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card rounded">
                        <div className="card-image">
                            <span className="card-notify-badge">Mobile App</span>
                            <img 
                                src={jobAppImg} 
                                alt="React Native Job Search App" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">React Native</span>
                            <span className="card-detail-badge">TypeScript</span>
                            <span className="card-detail-badge">Node</span>
                            <span className="card-detail-badge">Redux</span>
                        </div>
                        <div className="card-body">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    React Native Job Search Portal
                                </h5>
                            </div>
                            <a className="ad-btn" href="https://github.com/YeYintLin/react-native-job-app" target="_blank" rel="noreferrer">View Code</a>
                        </div>
                    </div>
                </div>           
                
                <div className="col-md-4">
                    <div className="card rounded">
                        <div className="card-image">
                            <span className="card-notify-badge">IoT / Embedded</span>
                            <img 
                                src={iotImg} 
                                alt="IoT Automated Irrigation System" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">C++</span>
                            <span className="card-detail-badge">Arduino</span>
                            <span className="card-detail-badge">ESP32</span>
                            <span className="card-detail-badge">Node-RED</span>
                        </div>
                        <div className="card-body">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    IoT Automated Irrigation System
                                </h5>
                            </div>
                            <a className="ad-btn" href="https://github.com/YeYintLin/iot-irrigation-system" target="_blank" rel="noreferrer">View Code</a>
                        </div>
                    </div>
                </div>             
            </div>                  
        </div>
    </>
  )
}

export default Projects;
