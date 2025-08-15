import React from 'react';
import ReactDOM from 'react-dom/client';
import CurrencyConverter from './CurrencyConverter';
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <CurrencyConverter />
  </React.StrictMode>
);
