import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Este componente recibe las imágenes como prop y las muestra en una tabla
function ContainerList({ containers }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
         
            <TableCell style={{ fontWeight: 'bold' }}>Container Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {containers.map((container) => (
            <TableRow key={container.id}>
              <TableCell>{container.name}</TableCell>
              <TableCell>{container.status}</TableCell>
              <TableCell>{container.image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContainerList;

