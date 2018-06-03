import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'amfe-flexible';
import axios from 'axios';
import initReactFastclick from 'react-fastclick';
initReactFastclick();

axios.interceptors.request.use((config)=>{
    config.url=`/api${config.url}`;
    return config;
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
