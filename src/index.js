import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/plugins/vectormap/jquery-jvectormap-2.0.2.css';
import './assets/plugins/simplebar/css/simplebar.css';
import './assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css';
import './assets/plugins/metismenu/css/metisMenu.min.css';
import './assets/css/pace.min.css';
import './assets/css/bootstrap.min.css';
import './testiGo/assets/css/webstyle.css';
import './assets/css/icons.css';
import './assets/css/app.css';
import './assets/css/dark-sidebar.css';
import './assets/css/dark-theme.css';
import './assets/plugins/datatable/css/dataTables.bootstrap4.min.css';
import './assets/plugins/datatable/css/buttons.bootstrap4.min.css';
import './assets/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
