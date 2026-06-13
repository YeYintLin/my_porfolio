import React from 'react';
import "./Menus.css";
import { FcVoicePresentation } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { SiEducative, SiContentstack } from "react-icons/si";
import { LuProjector } from "react-icons/lu";
import { MdOutlineEmojiPeople, MdWorkHistory } from "react-icons/md";
const Menus = ({toggle}) => {
  return (
    <>
    {toggle ? (
        <>
        <div className="navbar-profile-pic">
            <img 
                src="https://cdn.download.ams.birds.cornell.edu/api/v2/asset/612763581/900" 
                alt="profile pic" 
            />
        </div>

        <div className="nav-items">
            <div className="nav-item">                            
                <div className="nav-link">
                    <IoHome />
                    Home
                </div>
                <div className="nav-link">
                    <MdOutlineEmojiPeople />
                    About
                </div>
                <div className="nav-link">
                    <MdWorkHistory />
                    Work Experience
                </div>
                <div className="nav-link">
                    <GrTechnology />
                    Tech Stack
                </div>
                <div className="nav-link">
                    <SiEducative />
                    Education
                </div>
                <div className="nav-link">
                    <LuProjector />
                    Project
                </div>                
                <div className="nav-link">
                    <SiContentstack />
                    Contact
                </div>
            </div>
        </div>
        </>        
        ) : (
        <>
        <div className="nav-items">
            <div className="nav-item">                            
                <div className="nav-link">
                    <IoHome title='Home'/>                
                </div>
                <div className="nav-link">
                    <MdOutlineEmojiPeople title='About'/>            
                </div>
                <div className="nav-link">
                    <MdWorkHistory title='Work Experience'/>
                </div>
                <div className="nav-link">
                    <GrTechnology title='Tech Stack'/>
                </div>
                <div className="nav-link">
                    <SiEducative title='Education'/>
                </div>
                <div className="nav-link">
                    <LuProjector title='Project'/>
                </div>
                <div className="nav-link">
                    <FcVoicePresentation title='Testimonial'/>
                </div>
                <div className="nav-link">
                    <SiContentstack title='Contact'/>
                </div>
            </div>
        </div>
        </>
        ) 
        
    }          
    </>
  )
}

export default Menus;