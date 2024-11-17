import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Images from './pages/Images';
import Containers from './pages/Containers';  // Importamos la página Containers
import Volumes from './pages/Volumes'; 
import CreateContainer from './pages/CreateContainer';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/images" element={<Images />} />
            <Route path="/containers" element={<Containers />} />  {/* Ruta para /containers */}
            <Route path="/volumes" element={<Volumes />} />  {/* Ruta para /volumes */}
            <Route path= "/containers/create" element={<CreateContainer/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
