import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import ImageModel from '../models/ImageModel';  // Importa el modelo ImageModel

function ImageList({ images }) {
  const [error, setError] = useState(null);

  // Function to delete an image
  const deleteImage = async (image) => {
    try {
      // Crear una instancia de ImageModel para la imagen a eliminar
      const imageModel = new ImageModel(image);
      console.log(ImageModel)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageModel.toJSON()), // Usar el método toJSON para enviar el objeto del modelo
      });

      if (response.ok) {
        //alert('Image deleted successfully!');
        window.location.reload();  // Recargar la página después de borrar la imagen
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };

  // Function to start a container with a specific image
const startContainerFromImage = async (imageName) => {
  
  try {
    // Redirigir a la página de creación de contenedor con el nombre de la imagen como parámetro
    window.location.href = `/containers/create?image=${encodeURIComponent(imageName)}`;  // Redirigir a la URL con el nombre de la imagen como parámetro
  
  } catch (err) {
    setError('Error connecting to the server.');
  }
};


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Image Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Tag</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Size</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map((image) => (
            <TableRow key={image.id}>
              <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{image.name}</TableCell>
              <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{image.tag}</TableCell>
              <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{image.size}</TableCell>
              <TableCell>
                {/* Buttons for delete and start container */}
                <Button
                  variant="contained"
                  onClick={() => deleteImage(image)}
                  sx={{ 
                    backgroundColor: '#90caf9', // Azul tenue
                    color: 'black',
                    fontSize: '0.75rem', // Fuente más pequeña
                    padding: '4px 8px', // Reducir padding
                    marginRight: '5px', // Espacio entre botones
                    minWidth: 'unset', // Quitar el ancho mínimo
                    boxShadow: 'none', // Quitar la sombra
                    '&:hover': {
                      backgroundColor: '#64b5f6', // Un poco más oscuro al hacer hover
                    }
                  }}  // Borrar imagen
                >
                  Delete Image
                </Button>
                <Button
                  variant="contained"
                  onClick={() => startContainerFromImage(image.name)}
                  sx={{ 
                    backgroundColor: '#90caf9', // Azul tenue
                    color: 'black',
                    fontSize: '0.75rem', // Fuente más pequeña
                    padding: '4px 8px', // Reducir padding
                    marginRight: '5px', // Espacio entre botones
                    minWidth: 'unset', // Quitar el ancho mínimo
                    boxShadow: 'none', // Quitar la sombra
                    '&:hover': {
                      backgroundColor: '#64b5f6', // Un poco más oscuro al hacer hover
                    }
                  }}  // Arrancar contenedor con imagen
                >
                  Start Container
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Display error if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </TableContainer>
  );
}

export default ImageList;
