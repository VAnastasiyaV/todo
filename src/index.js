import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app';
// const { default: App } = await import('./components/app');

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
//https://github.com/VAnastasiyaV/todo.git
// git remote add origin https://github.com/VAnastasiyaV/todo.git
// git branch -M main
// git push -u origin main