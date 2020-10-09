import React from 'react';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Rank from './Rank/Rank';
import FaceRecognition from './FaceRecognition/FaceRecognition';
import MenuBar from '../MenuBar/MenuBar';
//<MenuBar onRouteChange={onRouteChange}/>



const Home = ({ state, onRouteChange, onButtonSubmit, onInputChange}) => {
    const { imageUrl, imageShown, errorImage, boxArray, user} = state; 
    const { name, entries } = user; 
    return (
        <div>
              <Logo />
              <Rank name={name} entries={entries}/>
              
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
              <FaceRecognition 
                imageUrl={imageUrl} 
                boxArray={boxArray} 
                imageShown={imageShown}
                errorImage={errorImage}
              />
        </div>
    );
            
}

export default Home; 