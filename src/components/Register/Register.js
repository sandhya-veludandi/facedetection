import React from 'react'; 
import SignInRegister from '../SignInRegister/SignInRegister';

const Register = ({ loadUser, onRouteChange }) => {
    return (
        <SignInRegister component={'Register'} loadUser={ loadUser } onRouteChange={ onRouteChange }/>
    );
}


export default Register; 