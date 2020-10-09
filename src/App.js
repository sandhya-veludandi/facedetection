import React, {Component} from 'react';
import './App.css'; 
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'; 
import Register from './components/Register/Register'; 
import SignIn from './components/SignIn/SignIn'; 
import Home from './components/Home/Home';
import History from './components/History/History'; 

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true, 
        value_area: 250
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      boxArray: [],
      route: 'signin',
      isSignedIn: false,
      imageShown: false,
      errorImage: false, 
      updatedUrls: 0, 
      storedUrls: 0,
      user: {
        id: '', 
        name: '', 
        email: '',  
        entries: 0, 
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super(); 
    this.state = initialState; 
  }

  //what is componentDidMount() supposed to do? 
  
  componentDidMount() {
    this.render()

  }

  //updates current state to the user data
  loadUser = (userData) => {
    const {id, name, email, entries, joined} = userData; 
    this.setState({user: {
      id: id, 
      name: name, 
      email: email,  
      entries: entries, 
      joined: joined
    }})
  }

  //calculates the region of the box
  calculateFaceLocation = (box) => {
    try {
      const clarifaiFace = box.region_info.bounding_box;
    //console.log(resp.outputs[0].data.regions); 
    //const clarifaiFace = resp.outputs[0].data.regions[1].region_info.bounding_box;
    
      const image  = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
        leftCol: clarifaiFace.left_col * width,
      }
    }
    catch(err) {
      return <div>
        THIS IS THE ERROR: {{err}}
      </div>
    }
    

  }


  displayFaceBox = (boxArray) => {
    return this.setState({boxArray: boxArray});
  }

  createBoxArray = (response) => {
    const boxArray = response.outputs[0].data.regions;
    return boxArray.map(box => {
      return this.calculateFaceLocation(box);
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({errorImage: false}); 
    const { input, user} = this.state;
    this.setState({imageUrl: input});
    
    fetch('http://localhost:3001/imageUrl', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
              input: input
            })
      })
      .then(response => response.json())
      .then(response => {
        let validUrl = this.onImageChange(input, response.outputs); 
        if (response.outputs) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(resp => resp.json())
          .then(count => {
              if(validUrl) {
                const { updatedUrls } = this.state; 
                const updated = updatedUrls + 1;  
                this.setState(Object.assign(user, {entries: count}));
                this.setState({updatedUrls: updated});
                console.log('AHHH WHY IS NOT WORKING')
                this.displayFaceBox(this.createBoxArray(response));
                
              }
          }) 
        } 
        else {
          this.setState({errorImage: true})
        }
       
     })
    .catch(err => console.log('ERROR', err.message, err));
  
  }


  onRouteChange = (route) => {
      if(route === 'signout') {
        this.setState(initialState)
      }
      else if (route.indexOf('home') !== -1) {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
  }

  storedUrlsIncrease = () => {
    const { updatedUrls } = this.state; 
    this.setState({storedUrls: updatedUrls})
  }

  onImageChange = (input, response) => {
    
    if(response && input.indexOf(".jpg") !== -1 )  {
      this.setState({ imageShown: true });
      return true; 
    }
    else {
      this.setState({ imageShown: false});
      this.setState({boxArray: []}); 
      return false;
    }
   
    
   
  }
  
  render() {
    const { isSignedIn, route, updatedUrls, storedUrls } = this.state; 
    // console.log('PARTYYYYYYYYY ', this.state);
    // console.log('ROUTEEEE YEA', route);
    
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />

        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route.indexOf('home') !== -1
          
          ? (route === 'home' 
            ? <Home 
            state={this.state} 
            onRouteChange={this.onRouteChange} 
            onButtonSubmit={this.onButtonSubmit}
            onInputChange={this.onInputChange}
            />
            : <History updatedUrls={updatedUrls} 
                       storedUrls={storedUrls} 
                       onRouteChange={this.onRouteChange}
                       urlsIncrease={this.storedUrlsIncrease}/>
            )
  
          : (
              route === 'signin' || route === 'signout'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
      </div>
    );
  }
}

export default App;
