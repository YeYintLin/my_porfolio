import React from 'react';
import './Projects.css';
import cmsImg from '../../assets/images/cms_mockup.png';
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
                Here are some of the key production-grade systems and applications I have engineered, showcasing decoupled microservices, cloud deployments, and modern full-stack workflows.
            </p>       
            <div className="row" id="ads">
                {/* Flagship: Campus Management System */}
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card rounded h-100">
                        <div className="card-image">
                            <span className="card-notify-badge">Microservices / DevOps</span>
                            <img 
                                src={cmsImg} 
                                alt="Smart Campus Management System" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">Docker</span>
                            <span className="card-detail-badge">API Gateway</span>
                            <span className="card-detail-badge">Node / Express</span>
                            <span className="card-detail-badge">MongoDB</span>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    Smart Campus Management System (CMS)
                                </h5>
                                <p className="text-muted small mt-2">
                                    Decoupled microservices architecture with an API Gateway, 3 isolated MongoDB databases, Gemini AI integration, and Docker Compose orchestration.
                                </p>
                            </div>
                            <div className="mt-3">
                                <a className="ad-btn" href="https://github.com/YeYintLin/campus_management_system" target="_blank" rel="noreferrer">View Code</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* E-Commerce Platform */}
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card rounded h-100">
                        <div className="card-image">
                            <span className="card-notify-badge">Full stack</span>
                            <img 
                                src={ecommerceImg} 
                                alt="MERN E-Commerce Project" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">Next.js</span>
                            <span className="card-detail-badge">React</span>
                            <span className="card-detail-badge">Node</span>
                            <span className="card-detail-badge">MongoDB</span>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    E-Commerce Shopping Platform
                                </h5>
                                <p className="text-muted small mt-2">
                                    High-performance digital storefront with real-time cart state management, product filtering, and inventory admin dashboard.
                                </p>
                            </div>
                            <div className="mt-3">
                                <a className="ad-btn" href="https://github.com/YeYintLin/Shopping_Cart_Project" target="_blank" rel="noreferrer">View Code</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mobile App */}
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card rounded h-100">
                        <div className="card-image">
                            <span className="card-notify-badge">Mobile App</span>
                            <img 
                                src={jobAppImg} 
                                alt="React Native Fitness App" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">React Native</span>
                            <span className="card-detail-badge">TypeScript</span>
                            <span className="card-detail-badge">Expo</span>
                            <span className="card-detail-badge">Redux</span>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    Cross-Platform Fitness & Workout App
                                </h5>
                                <p className="text-muted small mt-2">
                                    Mobile workout routine and exercise analytics application built with React Native and Expo with offline persistence.
                                </p>
                            </div>
                            <div className="mt-3">
                                <a className="ad-btn" href="https://github.com/YeYintLin" target="_blank" rel="noreferrer">View Code</a>
                            </div>
                        </div>
                    </div>
                </div>           
                
                {/* IoT / Automation */}
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card rounded h-100">
                        <div className="card-image">
                            <span className="card-notify-badge">IoT / Automation</span>
                            <img 
                                src={iotImg} 
                                alt="IoT Automated Irrigation System" 
                            />
                        </div>
                        <div className="card-image-overly m-auto">
                            <span className="card-detail-badge">Python</span>
                            <span className="card-detail-badge">OpenCV</span>
                            <span className="card-detail-badge">C++</span>
                            <span className="card-detail-badge">ESP32</span>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="ad-title m-auto">
                                <h5 className="text-uppercase">
                                    Desktop Bot & Mechatronics Automation
                                </h5>
                                <p className="text-muted small mt-2">
                                    Computer vision automated workflows combined with microcontroller firmware for embedded hardware execution.
                                </p>
                            </div>
                            <div className="mt-3">
                                <a className="ad-btn" href="https://github.com/YeYintLin" target="_blank" rel="noreferrer">View Code</a>
                            </div>
                        </div>
                    </div>
                </div>             
            </div>                  
        </div>
    </>
  )
}

export default Projects;
