import React, {useState} from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import VolumeModel from '../models/VolumeModel';


// Este componente recibe las imágenes como prop y las muestra en una tabla
function VolumeList({ volumes }) {
    const [error, setError] = useState(null);
    // Comprobar si volumes es un array antes de intentar mapearlo
    if (!Array.isArray(volumes)) {
      return <div>No volumes available</div>;  // Si volumes no es un array, muestra un mensaje adecuado
    }

    // Function to delete a volume
  const deleteVolume = async (volume) => {
    try {
      // Asegurarse de que el contenedor está en el formato correcto según el modelo
      const volumeData = new VolumeModel(volume);

      const response = await fetch('http://127.0.0.1:8000/volumes/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volumeData),  // Enviar el contenedor completo
      });

      if (response.ok) {

        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold',  maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>Volume Name</TableCell>
              <TableCell style={{ fontWeight: 'bold',  maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>Driver</TableCell>
              <TableCell style={{ fontWeight: 'bold',  maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>MountPoint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumes.map((volume) => (
              <TableRow key={volume.id}>  
                <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{volume.name}</TableCell>
                <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{volume.driver}</TableCell>
                <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{volume.mountpoint}</TableCell>
                {/* Action Buttons for Start, Stop, and Delete */}
                <Button
                    variant="contained"
                    onClick={() => deleteVolume(volume)}
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
                    }} // Pasar el objeto completo
                  >
                    Delete
                  </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default VolumeList;
