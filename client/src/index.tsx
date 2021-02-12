import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// ReactDOM.render(<App />, document.getElementById('root'));

function render() {
  const App = require('./App').default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

render();

if (process.env.NODE_ENV === 'development') {
  (module as any).hot?.accept('./App', render);
}
