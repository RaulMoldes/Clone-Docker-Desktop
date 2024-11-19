import React, { useEffect, useState } from 'react';
import ImageList from '../components/ImageList';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Images() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Obtener las imágenes desde la API
  useEffect(() => {
    // Start loading
    setLoading(true);
  
    fetch(`${process.env.REACT_APP_BACKEND_URL}/images/`)
      .then((response) => response.json())
      .then((content) => {
        // Assuming 'image_info' is the correct field returned from the server
        setImages(content.images);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        // Ensure loading state is set to false after the fetch finishes
        setLoading(false);
      });
  }, []);
  

  const handleCreateImage = () => {
    // Aquí puedes agregar un formulario o lógica para crear una imagen
    navigate("/images/create")
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
