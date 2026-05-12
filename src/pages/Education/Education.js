import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { IoMdSchool } from "react-icons/io";
import './Education.css';
import { LiaUniversitySolid } from 'react-icons/lia';
const Education = () => {
    return (
        <>
            <div id="education" className="container-fluid education">

                <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
                    Education Background
                </h2>
                <hr />

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2018 - Present"
                        contentStyle={{ background: '#6F88FC', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  #6F88FC' }}
                        iconStyle={{ background: 'rgba(95, 134, 167, 1)', color: '#fff' }}
                        icon={<LiaUniversitySolid />}
                    >
                        <h3 className="vertical-timeline-element-title">Undergraduate Student</h3>
                        <h4 className="vertical-timeline-element-subtitle">Mechatronic Engineering</h4>
                        <h4 className="vertical-timeline-element-subtitle">University of Technology(Hmawbi)</h4>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2016 - 2018"
                        contentStyle={{ background: '#45E3FF', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  #45E3FF' }}
                        iconStyle={{ background: 'rgba(49, 154, 177, 1)', color: '#fff' }}
                        icon={<IoMdSchool />}
                    >
                        <h3 className="vertical-timeline-element-title">High School Student</h3>
                        <h4 className="vertical-timeline-element-subtitle">Yangon</h4>                        
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2016 - 2018"
                        contentStyle={{ background: '#45E3FF', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  #45E3FF' }}
                        iconStyle={{ background: 'rgba(49, 154, 177, 1)', color: '#fff' }}
                        icon={<IoMdSchool />}
                    >
                        <h3 className="vertical-timeline-element-title">High School Student</h3>
                        <h4 className="vertical-timeline-element-subtitle">Yangon</h4>                        
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </>
    )
}

export default Education;
