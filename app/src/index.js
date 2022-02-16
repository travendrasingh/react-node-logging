import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { browserHistory } from 'react-router';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';

ReactDOM.render(
  <React.StrictMode>
    <Routes history={browserHistory} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
