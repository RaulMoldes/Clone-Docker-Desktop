import React, { useEffect, useState } from 'react';
import VolumeList from '../components/VolumeList';
import { Button, CircularProgress } from '@mui/material';

function Volumes() {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener los volúmenes desde la API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/volumes/')
      .then((response) => response.json())
      .then((data) => {
        setVolumes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching volumes:', error);
        setLoading(false);
      });
  }, []);

  const handleCreateVolume = () => {
    // Aquí puedes agregar un formulario o lógica para crear un volumen
    console.log('Crear volumen');
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
      <h1>Docker Volumes</h1>
      <Button variant="contained" color="primary" onClick={handleCreateVolume} style={{ marginBottom: '20px' }}>
        Create Volume
      </Button>
      <VolumeList volumes={volumes} />
    </div>
  );
}

export default Volumes;
