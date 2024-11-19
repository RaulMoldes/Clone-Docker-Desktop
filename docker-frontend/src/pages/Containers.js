import React, { useEffect, useState } from 'react';
import ContainerList from '../components/ContainerList';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Containers() {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  // Crea la función navigate
  const navigate = useNavigate();

  // Obtener los contenedores desde la API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/containers/`)
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
    navigate('/containers/create');
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
