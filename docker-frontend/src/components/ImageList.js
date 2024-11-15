import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Este componente recibe las imágenes como prop y las muestra en una tabla
function ImageList({ images }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Image Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Tag</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map((image) => (
            <TableRow key={image.id}>
              <TableCell>{image.name}</TableCell>
              <TableCell>{image.tag}</TableCell>
              <TableCell>{image.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ImageList;
