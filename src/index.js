import React from 'react';
import *  as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
