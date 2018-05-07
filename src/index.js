import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'amfe-flexible';
import SingleGame from './SingleGame'

ReactDOM.render(<SingleGame />, document.getElementById('root'));
registerServiceWorker();
