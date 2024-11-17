import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const VolumeDetails = () => {
  const { volumeName } = useParams();  // Obtener el nombre del volumen desde la URL
  const [volumeData, setVolumeData] = useState(null);

  // Obtener detalles del volumen desde la API
  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/volumes/details/${volumeName}`);
        const data = await response.json();
        console.log(data);
        if (data) {
          setVolumeData(data);  // Guardamos los detalles del volumen
        } else {
          // Si no hay detalles, mostramos un mensaje de error
          setVolumeData({});
        }
      } catch (error) {
        console.error("Error al obtener los detalles del volumen:", error);
        setVolumeData({});
      }
    };

    fetchVolumeData();
  }, [volumeName]);

  // Función para formatear los valores de los detalles
  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return 'Vacío';  // Si el valor está vacío, mostrar 'Vacío'
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      // Si es un objeto, mostrarlo como pares clave-valor
      return Object.keys(value).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {value[key] ? formatValue(value[key]) : 'Vacío'}
        </div>
      ));
    }

    if (Array.isArray(value)) {
      // Si es un array, mostrar los elementos
      return value.map((item, index) => (
        <div key={index}>
          {formatValue(item)}
        </div>
      ));
    }

    // Si es un valor string o número, devolverlo directamente sin comillas
    return value.toString();
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Detalles del Volumen: {volumeName}</Typography>
      
      <Grid container spacing={3}>
        {/* Muestra los detalles del volumen en tarjetas */}
        {volumeData && Object.keys(volumeData).map((key) => (
          <Grid item xs={12} md={6} key={key}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">{key}</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {formatValue(volumeData[key])}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VolumeDetails;
