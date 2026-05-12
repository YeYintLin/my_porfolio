import React from 'react';
import './Projects.css';

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
            {/* {card design} */}
            <div className="row" id="ads">
                <div className="col-md-4">
                    <div className="card rounded">
                    <div className="card-image">
                        <span className="card-notify-badge">Full stack</span>
                        <img 
                            src="https://deerdesigner.com/wp-content/uploads/2024/05/Article-34-ecommerce-design-01.png.webp" 
                            alt="project1" 
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
                                Ye Yint Lin Online Shop Cart Website(front-end)
                            </h5>
                        </div>
                        <a className="ad-btn" href="https://github.com/YeYintLin/react_project">View</a>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                    <div className="card rounded">
                    <div className="card-image">
                        <span className="card-notify-badge">Full stack</span>
                        <img 
                            src="https://deerdesigner.com/wp-content/uploads/2024/05/Article-34-ecommerce-design-01.png.webp" 
                            alt="project1" 
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
                                Ye Yint Lin Online Shop Cart Website(back-end)
                            </h5>
                        </div>
                        <a className="ad-btn" href="https://github.com/YeYintLin/next-backend">View</a>
                    </div>
                </div>
                </div>           
                <div className="col-md-4">
                    <div className="card rounded">
                    <div className="card-image">
                        <span className="card-notify-badge">Full stack</span>
                        <img 
                            src="https://deerdesigner.com/wp-content/uploads/2024/05/Article-34-ecommerce-design-01.png.webp" 
                            alt="project1" 
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
                                Ye Yint Lin Online Shop Cart Website(front-end)
                            </h5>
                        </div>
                        <a className="ad-btn" href="https://github.com/YeYintLin/react_project">View</a>
                    </div>
                </div>
                </div>             
            </div>                  
        </div>
    </>
  )
}

export default Projects
