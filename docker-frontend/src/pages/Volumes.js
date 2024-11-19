import React, { useEffect, useState } from 'react';
import VolumeList from '../components/VolumeList';
import { Button, CircularProgress } from '@mui/material';
import {useNavigate} from 'react-router-dom';

function Volumes() {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener los volúmenes desde la API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/volumes/`)
      .then((response) => response.json())
      .then((content) => {
        setVolumes(content);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching volumes:', error);
        setLoading(false);
      });
  }, []);

  const handleCreateVolume = () => {
    // Aquí puedes agregar un formulario o lógica para crear un volumen
    navigate("/volumes/create")
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
