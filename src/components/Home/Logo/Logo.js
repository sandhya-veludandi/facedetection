import React from 'react';
import Tilt from 'react-tilt';
import face from './otherfacedetection.png';
import './Logo.css';


const Logo = () => {
    return (
        <div className="logo ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{height: 100, width: 100}} >
                <div className="Tilt-inner"> 
                    <img src={face} alt="logo"/> 
                </div>
            </Tilt>
        </div>
    );
}


export default Logo;