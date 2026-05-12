import React from 'react';
import "./Menus.css";
import { FcVoicePresentation } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { SiEducative, SiContentstack } from "react-icons/si";
import { LuProjector } from "react-icons/lu";
import { MdOutlineEmojiPeople, MdWorkHistory } from "react-icons/md";
const Menus = ({toggle}) => {
  const menuItems = [
    { id: "home", label: "Home", Icon: IoHome },
    { id: "about", label: "About", Icon: MdOutlineEmojiPeople },
    { id: "education", label: "Education", Icon: SiEducative },
    { id: "techstack", label: "Tech Stack", Icon: GrTechnology },
    { id: "projects", label: "Projects", Icon: LuProjector },
    { id: "work", label: "Work Experience", Icon: MdWorkHistory },            
    { id: "testimonial", label: "Testimonial", Icon: FcVoicePresentation },
    { id: "contact", label: "Contact", Icon: SiContentstack },
  ];

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
                {menuItems.map(({ id, label, Icon }) => (
                  <a key={id} className="nav-link" href={`#${id}`} aria-label={label}>
                    <Icon />
                    {label}
                  </a>
                ))}
            </div>
        </div>
        </>        
        ) : (
        <>
        <div className="nav-items">
            <div className="nav-item">                            
                {menuItems.map(({ id, label, Icon }) => (
                  <a
                    key={id}
                    className="nav-link"
                    href={`#${id}`}
                    aria-label={label}
                    title={label}
                  >
                    <Icon />
                  </a>
                ))}
            </div>
        </div>
        </>
        ) 
        
    }          
    </>
  )
}

export default Menus;
