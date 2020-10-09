import React from 'react'; 
import MenuBar from '../MenuBar/MenuBar';
import ReactDOM from 'react-dom';
//import './History.css'

//component that displays a gray box
const DisplayImageComponent = () => {
    // let liLength = document.getElementsByTagName('li').length; 
    // let reactNodeLi = React.createElement('li', {className:'li1'}, <ImageComponent />);
    // if(liLength === 0) {
    //     ReactDOM.render(reactNodeLi, document.getElementById('app'));
    // }
    // else {
    //     const app = document.getElementById('app'); 
    //     app.append('');
    //     ReactDOM.render(reactNodeLi, document.getElementById('app'));
    // }
    // // var rows = [];
    // // for (var i = 0; i < rows.length; i++) {
    // //     rows.push(ImageComponent());
    // // }
    // return (<div>{rows}</div>);   
    return (
        <div className="box">
            <h1>Hello</h1>
        </div>
    )
}

const  ImageComponent = () => {
    return  (
       <img src="http://placehold.it/150x150"/>
    ); 
}

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyShown: false,
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        this.setState({
          historyShown: true,
        });
      }

    render() {
        const {updatedUrls, storedUrls, onRouteChange, urlsIncrease, historyShown} = this.state; 
         return (
            <div>
                <MenuBar onRouteChange={onRouteChange}/>
                <button onClick={this.onButtonClick}>Click</button>
                    {this.state.historyShown ?
                    <DisplayImageComponent /> :
                    null
                    }
                <div id="app"></div>
            </div>
        );   
    }   
}

export default History; 