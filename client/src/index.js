import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './Store/index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);