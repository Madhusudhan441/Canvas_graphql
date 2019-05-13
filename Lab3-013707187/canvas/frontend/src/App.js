import React, { Component } from 'react';
import Main from './Main'
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
// import  from './store'
import { persistor,store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Main/>
      </div>
      </BrowserRouter>
      </Provider>
      </PersistGate>
      </ApolloProvider>
    );
  }
}

export default App;
