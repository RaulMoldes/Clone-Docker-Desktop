import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Este componente recibe las imágenes como prop y las muestra en una tabla
function VolumeList({ volumes }) {
    // Comprobar si volumes es un array antes de intentar mapearlo
    if (!Array.isArray(volumes)) {
      return <div>No volumes available</div>;  // Si volumes no es un array, muestra un mensaje adecuado
    }
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Volume Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Driver</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>MountPoint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumes.map((volume) => (
              <TableRow key={volume.id}>  
                <TableCell>{volume.name}</TableCell>
                <TableCell >{volume.driver}</TableCell>
                <TableCell >{volume.mountpoint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default VolumeList;
