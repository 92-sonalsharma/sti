import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Client from './components/client/js/Client';
// import ClientList from "./components/client/js/ManageClients";
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
