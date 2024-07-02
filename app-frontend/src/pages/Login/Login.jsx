
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        />
    </div>
  );
};

export default Login;