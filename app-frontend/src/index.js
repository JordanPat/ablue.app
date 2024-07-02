import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>
    // <Route path="/signup" component={<SignUp/>} />
    //       <Route path="/home" component={<Home/>} />
    //       <Route exact path="/" render={() => (
    //         loggedIn ? (
    //           <Navigate replace to="/home"/>
    //         ) : (
    //           <Navigate replace to="/login"/>
    //         )
    //       )}/>
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/signup",
    element: <SignUp/>,
  },
  {
    path:"/home",
    element: <Home/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
