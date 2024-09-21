import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import { BrowserRouter } from 'react-router-dom';
import {store} from './store'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

root.render(
  <Provider store={store}>
  <ApolloProvider client={client}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </ApolloProvider>
  </Provider>
);

