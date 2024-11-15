import React, { useEffect, useState } from 'react';
import ContainerList from '../components/ContainerList';
import { Button, CircularProgress } from '@mui/material';

function Containers() {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener los contenedores desde la API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/containers/')
      .then((response) => response.json())
      .then((data) => {
        setContainers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching containers:', error);
        setLoading(false);
      });
  }, []);

  const handleCreateContainer = () => {
    // Aquí puedes agregar un formulario o lógica para crear un contenedor
    console.log('Crear contenedor');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1>Docker Containers</h1>
      <Button variant="contained" color="primary" onClick={handleCreateContainer} style={{ marginBottom: '20px' }}>
        Create Container
      </Button>
      <ContainerList containers={containers} />
    </div>
  );
}

export default Containers;
