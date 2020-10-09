import React from 'react'; 
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, boxArray, imageShown, errorImage }) => {
        let boxClass = 'bounding-box'; 
        if(boxArray.length >= 30) {
             boxClass = 'bounding-box-medium'; 
        }
        if(boxArray.length >= 100)
             boxClass = 'bounding-box-small'; 
        if(imageShown) {
            return (
                <div className='center ma'>   
                    <div className='absolute mt2'>
                        <img id='inputImage' alt='pic' src={imageUrl} width='400px' height='auto'/>
                        <div className="absolute center f6 ">
                            There were {boxArray.length} face(s) detected in this photo. 
                        </div>         
                        <div>
                            {  
                                boxArray.map(box => {
                                    if(box.topRow !== 0) {
                                        return React.createElement('div', {
                                            className: boxClass, key: box.topRow,
                                            style:{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}, 
                                        }) 
                                    }                                       
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            );
        }
        else if (errorImage) {
            return (
                <div className='center ma pa5 white'>
                    Please enter a valid url. 
                </div>
            );
        }
        else if (imageUrl && !imageShown) {
            return (
                <div className='center ma pa5 white'>
                    Loading...
                </div>
            );
        }
        
        else {
            return (
                <div className='center ma pa5 white'>
                    Select an image file that ends with .jpg to get started!
                </div>
            );
        }

       
        
}


export default FaceRecognition; 