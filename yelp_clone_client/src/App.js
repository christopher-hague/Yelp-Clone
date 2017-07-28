import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';
// import AppContainer from './components/AppContainer', to revert back to original
import AppContainer2 from './componentsJS/AppContainer2'
import NavBar from './componentsJS/NavBar'

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <AppContainer2 />
      </div>
    </Router>
  )
}

export default App;
