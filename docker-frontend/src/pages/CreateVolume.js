import React, { useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import VolumeModel from '../models/VolumeModel';

const CreateVolume = () => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [driver, setDriver] = useState('');
  const [mountpoint, setMountpoint] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name) {
      setError('Name is required!');
      return;
    }

    // Create the volumeModel object
    const volumeModel = new VolumeModel({name,
        driver,
        mountpoint});

    try {
      // Send the POST request to the API
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/volumes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volumeModel),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        setMessage(`Volume '${data.name}' created successfully!`);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create volume');
        setMessage('');
      }
    } catch (err) {
      setError('Error connecting to the server.');
      setMessage('');
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Crear Volumen</h2>

      {/* Mostrar mensajes de éxito o error */}
      {message && <div className="success-message" style={{ color: 'green' }}>{message}</div>}
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre del Volumen"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Driver"
            variant="outlined"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Punto de Montaje"
            variant="outlined"
            value={mountpoint}
            onChange={(e) => setMountpoint(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Volumen
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateVolume;