import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
const iconPath = process.env.PUBLIC_URL + '/img/';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
      </React.Fragment>
    );
  }
}

export default App;
