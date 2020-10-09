import React from 'react'; 
import './MenuBar.css'; 



const MenuBar = ({ onRouteChange }) => {
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
    return (
    <div>
         <div id="mySidenav" className="sidenav">
           <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
           <a onClick={() => onRouteChange('home')} >Home</a>
           <a onClick={() => onRouteChange('home history')} >History</a>
           </div> 
      
          <span style={{fontsize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776; Menu</span>
         
      </div>
      
    );

}


export default MenuBar;