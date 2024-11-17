import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContainerModel from '../models/ContainerModel';  

function CreateContainer() {
  const [containerName, setContainerName] = useState('');
  const [image, setImage] = useState('');
  const [ports, setPorts] = useState('');
  const [envVars, setEnvVars] = useState('');
  const [volumes, setVolumes] = useState('');
  const [network, setNetwork] = useState('');
  const [command, setCommand] = useState('');
  const [restartPolicy, setRestartPolicy] = useState('');
  const [healthcheck, setHealthcheck] = useState('');
  const [cpuQuota, setCpuQuota] = useState('');
  const [memLimit, setMemLimit] = useState('');
  const [user, setUser] = useState('');
  const [hostname, setHostname] = useState('');
  const [labels, setLabels] = useState('');
  const [remove, setRemove] = useState(false);
  const [logConfig, setLogConfig] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Obtener los parámetros de la URL
  const location = useLocation();

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
      const response = await fetch('http://127.0.0.1:8000/containers/create', {
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
      
      {/* Campos del formulario */}
      <TextField label="Nombre del Contenedor" variant="outlined" value={containerName} onChange={(e) => setContainerName(e.target.value)} fullWidth required />
      <TextField label="Imagen" variant="outlined" value={image} onChange={(e) => setImage(e.target.value)} fullWidth required />
      <TextField label="Puertos" variant="outlined" value={ports} onChange={(e) => setPorts(e.target.value)} fullWidth placeholder="Ej: 8080:80" />
      <TextField label="Variables de Entorno" variant="outlined" value={envVars} onChange={(e) => setEnvVars(e.target.value)} fullWidth placeholder="Ej: ENV_VAR=VALUE" />
      <TextField label="Volúmenes" variant="outlined" value={volumes} onChange={(e) => setVolumes(e.target.value)} fullWidth placeholder="Ej: /host/path:/container/path" />
      <TextField label="Red" variant="outlined" value={network} onChange={(e) => setNetwork(e.target.value)} fullWidth placeholder="Ej: mi_red" />
      <TextField label="Comando" variant="outlined" value={command} onChange={(e) => setCommand(e.target.value)} fullWidth placeholder="Ej: /bin/bash" />
      <FormControl fullWidth>
        <InputLabel>Política de Reinicio</InputLabel>
        <Select value={restartPolicy} onChange={(e) => setRestartPolicy(e.target.value)} label="Política de Reinicio">
          <MenuItem value="always">Always</MenuItem>
          <MenuItem value="on-failure">On Failure</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Healthcheck" variant="outlined" value={healthcheck} onChange={(e) => setHealthcheck(e.target.value)} fullWidth placeholder="Ej: curl --fail http://localhost || exit 1" />
      <TextField label="Cuota de CPU" variant="outlined" value={cpuQuota} onChange={(e) => setCpuQuota(e.target.value)} fullWidth placeholder="Ej: 50000" />
      <TextField label="Límite de Memoria" variant="outlined" value={memLimit} onChange={(e) => setMemLimit(e.target.value)} fullWidth placeholder="Ej: 512m" />
      <TextField label="Usuario" variant="outlined" value={user} onChange={(e) => setUser(e.target.value)} fullWidth placeholder="Ej: root" />
      <TextField label="Hostname" variant="outlined" value={hostname} onChange={(e) => setHostname(e.target.value)} fullWidth placeholder="Ej: mi_hostname" />
      <TextField label="Etiquetas" variant="outlined" value={labels} onChange={(e) => setLabels(e.target.value)} fullWidth placeholder="Ej: proyecto=mi_proyecto" />
      <FormControlLabel control={<Checkbox checked={remove} onChange={(e) => setRemove(e.target.checked)} />} label="Eliminar después de detener" />
      <TextField label="Configuración de Logs" variant="outlined" value={logConfig} onChange={(e) => setLogConfig(e.target.value)} fullWidth placeholder="Ej: { 'max-file': '3' }" />

      {/* Botón de envío */}
      <Button type="submit" variant="contained" color="primary">Crear Contenedor</Button>

      {/* Mostrar errores */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Box>
  );
}

export default CreateContainer;