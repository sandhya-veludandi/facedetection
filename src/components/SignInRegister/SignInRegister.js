import React from 'react'; 

//Name Component
const Name = ({component, onNameChange}) => {
    if(component === 'Sign In')
        return null; 
    else {
        return (
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="register"
                    onChange={onNameChange}
                />
            </div>
        );
    }
}

//IncorrectCredential Component
const IncorrectCredentials = (props) => {
    const { incorrectCreds, errorMsg } = props.state;
    if(!incorrectCreds)
        return null; 
        
    return (
        <div className="white">
            {errorMsg}
        </div>
    ); 
}
    
class SignInRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            name: '',
            incorrectCreds: false,
            errorMsg: '', 
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleKeypressSubmit = e => {
        //it triggers by pressing the enter key
      if(e.key === 'Enter') {
        this.onSubmit(); 
      }
    }

    onSubmit = () => {
        const { component } = this.props; 
        const url = component.split(' ').join('') 
        const { email, password, name } = this.state; 
        
        fetch(`http://localhost:3001/${url}`, {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            }) 
            

        })
            .then(resp => resp.json())
            .then(user => {
                    if(user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                    else {
                        this.setState({incorrectCreds: true});
                        this.setState({errorMsg: user}) 
                    }
                      
            })
            .catch(err => console.log("Oh no!: ", err.message))
            
    }

    render() {
        const {component} = this.props; 
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                    <main className="pa4 black-80">
                            <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">{this.props.component}</legend>

                                <Name component={component} onNameChange={this.onNameChange}/>
                                <div className="mt3">
                                    <label className="email db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password"
                                        onChange={this.onPasswordChange}
                                        onKeyPress={this.handleKeypressSubmit}
                                    />
                                </div>
                                </fieldset>
                                <div className="">
                                    <button
                                        onClick={this.onSubmit}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                        type="submit" value={this.props.component}> Submit
                                    </button>
                                </div>
                                
                            </div>
                    </main>
                </article>
                <IncorrectCredentials state={this.state}/>
            </div>
        );

    }
} 

export default SignInRegister;