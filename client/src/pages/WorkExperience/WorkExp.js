import React from 'react'
import './WorkExp.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

const WorkExp = () => {
    return (
        <>
            <div id="work" className="container-fluid work">
                <div className="work-exp">
                    <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
                        Work Experience
                    </h2>
                    <hr />
                    <VerticalTimeline lineColor="#138781">
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: '#138781', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  #138781' }}
                            date="2024 - Present"
                            iconStyle={{ background: '#138781', color: '#fff' }}
                            icon={<FaReact />}
                        >
                            <h3 className="vertical-timeline-element-title">Full Stack Developer Intern</h3>
                            <h4 className="vertical-timeline-element-subtitle">Apex Tech Solutions (Remote)</h4>
                            <p>
                                Developing and maintaining responsive web applications using the MERN stack. Integrating RESTful APIs, designing MongoDB schemas, and optimizing state management.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: '#1e1e2c', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  #1e1e2c' }}
                            date="2022 - 2024"
                            iconStyle={{ background: '#1e1e2c', color: '#fff' }}
                            icon={<FaNodeJs />}
                        >
                            <h3 className="vertical-timeline-element-title">Freelance Web Developer</h3>
                            <h4 className="vertical-timeline-element-subtitle">Self-Employed</h4>
                            <p>
                                Crafted high-performance, responsive websites for local businesses and startups. Focused on bespoke UI/UX designs, API integrations, and SEO optimization.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: '#f29f67', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  #f29f67' }}
                            date="2021 - 2022"
                            iconStyle={{ background: '#f29f67', color: '#fff' }}
                            icon={<SiCplusplus />}
                        >
                            <h3 className="vertical-timeline-element-title">Mechatronics Project Engineer</h3>
                            <h4 className="vertical-timeline-element-subtitle">TechHmawbi Robotics Lab</h4>
                            <p>
                                Designed and simulated automation circuits. Programmed microcontrollers (C++) and integrated sensor modules with IoT dashboards for real-time monitoring.
                            </p>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>
            </div>
        </>
    )
}

export default WorkExp
