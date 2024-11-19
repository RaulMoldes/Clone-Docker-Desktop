import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import ContainerModel from '../models/ContainerModel';  // Asegúrate de importar el modelo
import { useNavigate } from 'react-router-dom';

function ContainerList({ containers }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to start a container - recibe el objeto completo del contenedor
  const startContainer = async (container) => {
    try {
      // Asegurarse de que el contenedor está en el formato correcto según el modelo
      const containerData = new ContainerModel(container);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/containers/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el contenedor completo
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

  // Function to stop a container - recibe el objeto completo del contenedor
  const stopContainer = async (container) => {
    try {
      // Asegurarse de que el contenedor está en el formato correcto según el modelo
      const containerData = new ContainerModel(container);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/containers/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el contenedor completo
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

  // Function to delete a container - recibe el objeto completo del contenedor
  const deleteContainer = async (container) => {
    try {
      // Asegurarse de que el contenedor está en el formato correcto según el modelo
      const containerData = new ContainerModel(container);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/containers/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el contenedor completo
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
  // Función para inspeccionar y redireccionar a la página de detalles del contenedor
  const inspectContainer = (container) => {
    navigate(`/containers/details/${container.name}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Container Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {containers.map((container) => {
            // Asegurarte de que cada contenedor respeta la estructura del modelo
            const formattedContainer = new ContainerModel(container);  // Inicializa el contenedor con el modelo unificado

            return (
              <TableRow key={formattedContainer.name}>  {/* Usamos 'name' como clave única */}
                <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{formattedContainer.name}</TableCell>
                <TableCell style = {{maxWidth: '200px',overflow: 'hidden', textOverflow: 'ellipsis' }}>{formattedContainer.status}</TableCell>
                <TableCell>{formattedContainer.image}</TableCell>
                <TableCell>
                  {/* Action Buttons for Start, Stop, and Delete */}
                  <Button
  variant="contained"
  onClick={() => startContainer(formattedContainer)}
  disabled={formattedContainer.status === 'running'}
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
  }}
>
  Start
</Button>
<Button
  variant="contained"
  onClick={() => stopContainer(formattedContainer)}
  disabled={formattedContainer.status === 'stopped' || formattedContainer.status === 'exited'}
  sx={{ 
    backgroundColor: '#90caf9',
    color: 'black',
    fontSize: '0.75rem',
    padding: '4px 8px',
    marginRight: '5px',
    minWidth: 'unset',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#64b5f6',
    }
  }}
>
  Stop
</Button>
<Button
  variant="contained"
  onClick={() => deleteContainer(formattedContainer)}
  sx={{ 
    backgroundColor: '#90caf9',
    color: 'black',
    fontSize: '0.75rem',
    padding: '4px 8px',
    marginRight: '5px',
    minWidth: 'unset',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#64b5f6',
    }
  }}
>
  Delete
</Button>
<Button
  variant="contained"
  onClick={() => inspectContainer(formattedContainer)}
  sx={{ 
    backgroundColor: '#90caf9',
    color: 'black',
    fontSize: '0.75rem',
    padding: '4px 8px',
    marginRight: '5px',
    minWidth: 'unset',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#64b5f6',
    }
  }}
>
   Inspect
</Button>

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Display error if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </TableContainer>
  );
}

export default ContainerList;
