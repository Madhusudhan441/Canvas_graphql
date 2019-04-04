import React, { Component } from 'react';
import Main from './Main'
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
// import  from './store'
import { persistor,store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
class App extends Component {
  render() {
    return (
      <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Main/>
      </div>
      </BrowserRouter>
      </Provider>
      </PersistGate>
    );
  }
}

export default App;
