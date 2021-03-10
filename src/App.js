import React from 'react';
import './App.css';
import Routes from "./Routes"
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {

  return (
    <div className="App">
        <Navbar />
        <Routes />
    </div>
  );
}

export default App;
