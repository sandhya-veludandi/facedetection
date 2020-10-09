import React from 'react'; 
import SignInRegister from '../SignInRegister/SignInRegister';

const SignIn = ({ loadUser, onRouteChange }) => {
    return (
        <SignInRegister component={'Sign In'} loadUser={ loadUser } onRouteChange={ onRouteChange }/>
    );
}


export default SignIn; 