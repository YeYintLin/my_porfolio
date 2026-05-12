import React, { useState } from 'react';
import Home from '../../pages/Home/Home';
import { AiOutlineDoubleLeft,AiOutlineDoubleRight } from "react-icons/ai";
import './Layout.css';
import Menus from '../Menus/Menus';

const Layout = ({ children }) => {
  const [toggle,setToggle] = useState(true)

  //change toggle
  const handleToggle = () =>{
    setToggle(!toggle);
  }

  return (
    <>
      <div className="sidebar-section">
        <div className={toggle ? "sidebar-toggle" : "sidebar"}>
          <div className="sidebar-toggle-icons">            
            <p onClick={handleToggle}>
              {
                toggle? (
                <AiOutlineDoubleLeft size={30}/>
              )  : (
                 <AiOutlineDoubleRight size={30}/>
                )
              }              
            </p>            
          </div>
          <Menus toggle={toggle}/>
        </div>
        <main className={toggle ? "main main-expanded" : "main main-collapsed"}>
          <Home/>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
