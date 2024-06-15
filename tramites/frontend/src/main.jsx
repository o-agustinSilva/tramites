import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/AuthProvider';
import { TramiteProvider } from './context/TramiteProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TramiteProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </TramiteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

