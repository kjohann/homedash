import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function renderApp() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );  
}

renderApp();

module.hot.accept(renderApp);

