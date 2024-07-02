import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';

const client_id = process.env.REACT_APP_CLIENT_ID
// "696742129884-ubgfmm0qagrib27d50ucq9r8fa2nj0bn.apps.googleusercontent.com"

const App = () => {
  console.log("App()");
  const { loggedIn, setLoggedIn } = useState(false);
  return (
    <GoogleOAuthProvider clientId={client_id}>
      <div>
        <NavBar/>
       <Login/>
      </div>
    <div className="App">
      <header className="App-header">
        <h3>
          aBlue Workout app.
        </h3>
        <br/>
        <div>
        <a
          className="App-link"
          href="https://acadianblue.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          llc
        </a>
        </div>
      </header>
      
    </div>
    </GoogleOAuthProvider>
  );
};

export default App;
