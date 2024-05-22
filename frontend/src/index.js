import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
//import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from 'react-router-dom';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

root.render(
  
  <React.StrictMode>
  <Router>
  {/* <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI
      }}
    > */}

    
    <App />
    {/* </Auth0Provider> */}
    </Router>
  </React.StrictMode>
);
} else {
  console.error('Could not find root element');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
