import React from 'react';
import ReactDOM from 'react-dom';
import '../npwd.config';
import App from './App';

if (import.meta.env.DEV) {
  ReactDOM.render(
    <App theme={{ palette: { mode: 'dark' } }} />,
    document.getElementById('root'),
  );
}