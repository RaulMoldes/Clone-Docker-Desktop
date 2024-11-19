import React, { useState } from 'react';
import { Button, TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

function CreateImage() {
  const [imageName, setImageName] = useState('');
  const [dockerfilePath, setDockerfilePath] = useState('');
  const [buildOption, setBuildOption] = useState('pull'); // Estado para controlar la opción (pull o build)
  const [error, setError] = useState('');

  // Manejo de la opción seleccionada (pull o build)
  const handleBuildOptionChange = (e) => {
    setBuildOption(e.target.value);
  };

  // Crear la imagen con docker pull
  const handlePullImage = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images/pull/${imageName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Imagen descargada exitosamente');
      } else {
        const data = await response.json();
        setError(data.error || 'Error al hacer pull de la imagen');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo más tarde.');
    }
  };

  // Construir la imagen desde un Dockerfile
  const handleBuildImage = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images/build`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dockerfilePath, imageName }),
      });

      if (response.ok) {
        alert('Imagen construida exitosamente');
      } else {
        const data = await response.json();
        setError(data.error || 'Error al construir la imagen');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo más tarde.');
    }
  };

  // Manejador de submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (buildOption === 'pull') {
      handlePullImage();
    } else {
      handleBuildImage();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Crear Imagen Docker</h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Opción</InputLabel>
            <Select value={buildOption} onChange={handleBuildOptionChange} label="Opción">
              <MenuItem value="pull">Docker Pull</MenuItem>
              <MenuItem value="build">Construir desde Dockerfile</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Opción para Docker Pull */}
        {buildOption === 'pull' && (
          <Grid item xs={12}>
            <TextField
              label="Nombre de la Imagen"
              variant="outlined"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}

        {/* Opción para construir desde Dockerfile */}
        {buildOption === 'build' && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Nombre de la Imagen"
                variant="outlined"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ruta del Dockerfile"
                variant="outlined"
                value={dockerfilePath}
                onChange={(e) => setDockerfilePath(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {buildOption === 'pull' ? 'Descargar Imagen' : 'Construir Imagen'}
          </Button>
        </Grid>
      </Grid>

      {/* Mostrar errores */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Box>
  );
}

export default CreateImage;
