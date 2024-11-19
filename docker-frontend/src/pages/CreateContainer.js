import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, Grid , Checkbox, FormControlLabel, Chip, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContainerModel from '../models/ContainerModel';  

function CreateContainer() {
  const [containerName, setContainerName] = useState('');
  const [image, setImage] = useState('');
  const [ports, setPorts] = useState('');
  const [envVars, setEnvVars] = useState('');
  const [volumes, setVolumes] = useState([]); // Array to store different types of volumes
  const [volumeType, setVolumeType] = useState('bind'); // Default to Bind Mount
  const [namedVolumeContainerPath, setNamedVolumeContainerPath] = useState('');
  const [anonymousVolumeContainerPath, setAnonymousVolumeContainerPath] = useState('');// Default to Named volumes
  const [bindMountHost, setBindMountHost] = useState('');
  const [bindMountContainer, setBindMountContainer] = useState('');
  const [namedVolume, setNamedVolume] = useState('');
  const [network, setNetwork] = useState('');
  const [command, setCommand] = useState('');
  const [restartPolicy, setRestartPolicy] = useState('');
  const [healthcheck, setHealthcheck] = useState('');
  const [cpuQuota, setCpuQuota] = useState('');
  const [memLimit, setMemLimit] = useState('');
  const [labels, setLabels] = useState([]); // Array for labels
  const [currentLabel, setCurrentLabel] = useState(''); // Current label input
  const [remove, setRemove] = useState(false);
  const [user, setUser] = useState('');
  const [hostname, setHostname] = useState('');
  const [logConfig, setLogConfig] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Obtener los parámetros de la URL
  const location = useLocation();
   // Handler for adding a new label
   const handleAddLabel = () => {
    if (currentLabel.trim()) {
      setLabels([...labels, currentLabel.trim()]);
      setCurrentLabel(''); // Clear the current input after adding
    }
  };

  // Handler for deleting a label
  const handleDeleteLabel = (labelToDelete) => {
    setLabels(labels.filter((label) => label !== labelToDelete));
  };

  
  // Handler for volume addition
  const handleAddVolume = () => {
    let newVolume = '';
    
    if (volumeType === 'bind' && bindMountHost && bindMountContainer) {
      newVolume = `${bindMountHost}:${bindMountContainer}`;
    } else if (volumeType === 'named' && namedVolume && namedVolumeContainerPath) {
      newVolume = `${namedVolume}:${namedVolumeContainerPath}`;
    } else if (volumeType === 'anonymous' && anonymousVolumeContainerPath) {
      newVolume = anonymousVolumeContainerPath; // Only specify container path for anonymous
    }

    if (newVolume) {
      setVolumes([...volumes, { type: volumeType, value: newVolume }]);
      // Clear inputs after adding
      setBindMountHost('');
      setBindMountContainer('');
      setNamedVolume('');
      setNamedVolumeContainerPath('');
      setAnonymousVolumeContainerPath('');
    }
  };

  // Handler for deleting a volume
  const handleDeleteVolume = (indexToDelete) => {
    setVolumes(volumes.filter((_, index) => index !== indexToDelete));
  };


  useEffect(() => {
    // Extraer el nombre de la imagen de los parámetros de la URL
    const urlParams = new URLSearchParams(location.search);
    const imageName = urlParams.get('image');
    if (imageName) {
      setImage(imageName);  // Establecer el valor predeterminado en el formulario
    }
  }, [location]);

  // Handle submit
  const handleCreateContainer = async (e) => {
    e.preventDefault();


   
    // Usar el modelo unificado para crear los datos del contenedor
    const containerData = ContainerModel.fromFormData({
      containerName,
      image,
      ports,
      envVars,
      volumes,
      network,
      command,
      restartPolicy,
      healthcheck,
      cpuQuota,
      memLimit,
      user,
      hostname,
      labels,
      remove,
      logConfig
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/containers/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),  // Enviar el objeto creado
      });

      if (response.ok) {
        navigate('/containers');
      } else {
        const errorData = await response.json();
        setError('Error al crear el contenedor: ' + errorData.error || 'Desconocido');
      }
    } catch (error) {
      setError('Error de conexión. Intenta de nuevo más tarde.');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleCreateContainer} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Crear Contenedor</h2>
      
      {/* Use Grid to organize the fields into two columns */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del Contenedor"
            variant="outlined"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Imagen"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Puertos"
            variant="outlined"
            value={ports}
            onChange={(e) => setPorts(e.target.value)}
            fullWidth
            placeholder="Ej: 8080:80"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Variables de Entorno"
            variant="outlined"
            value={envVars}
            onChange={(e) => setEnvVars(e.target.value)}
            fullWidth
            placeholder="Ej: ENV_VAR=VALUE"
          />
        </Grid>
         {/* Campos de Volúmenes */}
         
        {/* Volume Type Selector */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Volumen</InputLabel>
            <Select value={volumeType} onChange={(e) => setVolumeType(e.target.value)} label="Tipo de Volumen">
              <MenuItem value="bind">Bind Mount</MenuItem>
              <MenuItem value="named">Named Volume</MenuItem>
              <MenuItem value="anonymous">Anonymous Volume</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Bind Mount Inputs */}
        {volumeType === 'bind' && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Ruta en Host"
                variant="outlined"
                value={bindMountHost}
                onChange={(e) => setBindMountHost(e.target.value)}
                fullWidth
                placeholder="Ej: /ruta/host"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ruta en Contenedor"
                variant="outlined"
                value={bindMountContainer}
                onChange={(e) => setBindMountContainer(e.target.value)}
                fullWidth
                placeholder="Ej: /ruta/contenedor"
              />
            </Grid>
          </>
        )}

        {/* Named Volume Input */}
        {volumeType === 'named' && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Nombre del Volumen"
                variant="outlined"
                value={namedVolume}
                onChange={(e) => setNamedVolume(e.target.value)}
                fullWidth
                placeholder="Ej: mi_volumen"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ruta en Contenedor"
                variant="outlined"
                value={namedVolumeContainerPath}
                onChange={(e) => setNamedVolumeContainerPath(e.target.value)}
                fullWidth
                placeholder="Ej: /ruta/contenedor"
              />
            </Grid>
          </>
        )}

        {/* Anonymous Volume Input */}
        {volumeType === 'anonymous' && (
          <Grid item xs={12}>
            <TextField
              label="Ruta en Contenedor"
              variant="outlined"
              value={anonymousVolumeContainerPath}
              onChange={(e) => setAnonymousVolumeContainerPath(e.target.value)}
              fullWidth
              placeholder="Ej: /ruta/contenedor"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddVolume} style={{ marginTop: '10px' }}>
            Añadir Volumen
          </Button>
        </Grid>

        {/* Display Added Volumes */}
        <Grid item xs={12}>
          <Paper variant="outlined" style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {volumes.map((volume, index) => (
              <Chip
                key={index}
                label={`${volume.type === 'anonymous' ? 'Anonymous Volume' : volume.value}`}
                onDelete={() => handleDeleteVolume(index)}
                color="primary"
                style={{ margin: '5px' }}
              />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Red"
            variant="outlined"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            fullWidth
            placeholder="Ej: mi_red"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Comando"
            variant="outlined"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            fullWidth
            placeholder="Ej: /bin/bash"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Política de Reinicio</InputLabel>
            <Select
              value={restartPolicy}
              onChange={(e) => setRestartPolicy(e.target.value)}
              label="Política de Reinicio"
            >
              <MenuItem value="always">Always</MenuItem>
              <MenuItem value="on-failure">On Failure</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Healthcheck"
            variant="outlined"
            value={healthcheck}
            onChange={(e) => setHealthcheck(e.target.value)}
            fullWidth
            placeholder="Ej: curl --fail http://localhost || exit 1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cuota de CPU"
            variant="outlined"
            value={cpuQuota}
            onChange={(e) => setCpuQuota(e.target.value)}
            fullWidth
            placeholder="Ej: 50000"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Límite de Memoria"
            variant="outlined"
            value={memLimit}
            onChange={(e) => setMemLimit(e.target.value)}
            fullWidth
            placeholder="Ej: 512m"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Usuario"
            variant="outlined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            placeholder="Ej: root"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hostname"
            variant="outlined"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
            fullWidth
            placeholder="Ej: mi_hostname"
          />
        </Grid>
         {/* Etiquetas (Tags) */}
         <Grid item xs={12}>
          <TextField
            label="Nueva Etiqueta"
            variant="outlined"
            value={currentLabel}
            onChange={(e) => setCurrentLabel(e.target.value)}
            fullWidth
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddLabel();
              }
            }}
            placeholder="Ej: proyecto=mi_proyecto"
          />
          <Button variant="contained" color="primary" onClick={handleAddLabel} style={{ marginTop: '10px' }}>
            Añadir Etiqueta
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {labels.map((label, index) => (
              <Chip
                key={index}
                label={label}
                onDelete={() => handleDeleteLabel(label)}
                color="primary"
                style={{ margin: '5px' }}
              />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={remove} onChange={(e) => setRemove(e.target.checked)} />}
            label="Eliminar después de detener"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Configuración de Logs"
            variant="outlined"
            value={logConfig}
            onChange={(e) => setLogConfig(e.target.value)}
            fullWidth
            placeholder="Ej: { 'max-file': '3' }"
          />
        </Grid>
      </Grid>

      {/* Botón de envío */}
      <Button type="submit" variant="contained" color="primary">Crear Contenedor</Button>

      {/* Mostrar errores */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Box>
  );
}

export default CreateContainer;