import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

function render() {
  const App = require('./App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();

if (process.env.NODE_ENV === 'development') {
  (module as any).hot?.accept('./App', render);
}
