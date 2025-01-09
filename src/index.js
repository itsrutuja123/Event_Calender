import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.css'; // Global styles
import './style/calendergrid.css'; // Import component-specific styles after global styles
import HomePage from './pages/HomePage'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomePage /> {/* Render the HomePage component */}
  </React.StrictMode>
);
