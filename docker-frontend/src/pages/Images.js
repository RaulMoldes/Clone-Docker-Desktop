import React, { useEffect, useState } from 'react';
import ImageList from '../components/ImageList';
import { Button, CircularProgress } from '@mui/material';

function Images() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener las imágenes desde la API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/images/')
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, []);

  const handleCreateImage = () => {
    // Aquí puedes agregar un formulario o lógica para crear una imagen
    console.log('Crear imagen');
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
      <h1>Docker Images</h1>
      <Button variant="contained" color="primary" onClick={handleCreateImage} style={{ marginBottom: '20px' }}>
        Create Image
      </Button>
      <ImageList images={images} />
    </div>
  );
}

export default Images;
