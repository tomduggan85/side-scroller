import React, { Component } from 'react';
import GameRenderer from './components/GameRenderer'
import RootStore from './state/RootStore'
import { Provider } from 'mobx-react'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider {...RootStore} >
        <GameRenderer />
      </Provider>
    );
  }
}

export default App;
