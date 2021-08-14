import React from 'react';
import Header from './components/header'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home'
import Char from './components/char'
import Footer from './components/footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
          <Route path="/" exact component={Home}/>
          <Route path="/char" exact component={Char}/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
