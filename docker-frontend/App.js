// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../../docker-frontend/src/components/Sidebar';
import Dashboard from '../../docker-frontend/src/pages/Dashboard';
import Containers from '../../docker-frontend/src/pages/Containers';
import Images from '../../docker-frontend/src/pages/Images';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/images" element={<Images />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
