import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const ContainerDetails = () => {
  const { containerName } = useParams();  // Obtener el nombre del contenedor desde la URL
  const [containerData, setContainerData] = useState(null);

  // Obtener detalles del contenedor desde la API
  useEffect(() => {
    const fetchContainerData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/containers/details/${containerName}`);
        const data = await response.json();
        
        if (data.details) {
          setContainerData(data.details);  // Guardamos los detalles del contenedor
        } else {
          // Si no hay detalles, mostramos un mensaje de error
          setContainerData({});
        }
      } catch (error) {
        console.error("Error al obtener los detalles del contenedor:", error);
        setContainerData({});
      }
    };

    fetchContainerData();
  }, [containerName]);

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
      <Typography variant="h4" gutterBottom>Detalles del Contenedor: {containerName}</Typography>
      
      <Grid container spacing={3}>
        {/* Muestra los detalles del contenedor en tarjetas */}
        {containerData && Object.keys(containerData).map((key) => (
          <Grid item xs={12} md={6} key={key}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">{key}</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {formatValue(containerData[key])}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContainerDetails;

