import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import ContainerModel from '../models/ContainerModel';  // Asegúrate de importar el modelo

function ContainerList({ containers }) {
  const [error, setError] = useState(null);

  // Function to start a container - recibe el objeto completo del contenedor
  const startContainer = async (container) => {
    try {
      // Asegurarse de que el contenedor está en el formato correcto según el modelo
      const containerData = new ContainerModel(container);

      const response = await fetch('http://127.0.0.1:8000/containers/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el contenedor completo
      });

      if (response.ok) {
        alert('Container started successfully!');
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

      const response = await fetch('http://127.0.0.1:8000/containers/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el contenedor completo
      });

      if (response.ok) {
        alert('Container stopped successfully!');
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

      const response = await fetch('http://127.0.0.1:8000/containers/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el contenedor completo
      });

      if (response.ok) {
        alert('Container deleted successfully!');
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
                <TableCell>{formattedContainer.name}</TableCell>
                <TableCell>{formattedContainer.status}</TableCell>
                <TableCell>{formattedContainer.image}</TableCell>
                <TableCell>
                  {/* Action Buttons for Start, Stop, and Delete */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => startContainer(formattedContainer)} // Pasar el objeto completo
                    disabled={formattedContainer.status === 'running'}  // Disable if already running
                  >
                    Start
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => stopContainer(formattedContainer)}  // Pasar el objeto completo
                    disabled={formattedContainer.status === 'stopped' || formattedContainer.status === 'exited'}  // Disable if already stopped
                  >
                    Stop
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteContainer(formattedContainer)}  // Pasar el objeto completo
                  >
                    Delete
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
