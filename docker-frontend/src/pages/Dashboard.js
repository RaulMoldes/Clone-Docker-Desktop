import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Para enlaces a otras páginas (volúmenes, imágenes, contenedores)

function Dashboard() {
  const [containersCount, setContainersCount] = useState(null);
  const [imagesCount, setImagesCount] = useState(null);
  const [volumesCount, setVolumesCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hacer las llamadas a las APIs cuando el componente se monta
  useEffect(() => {
    // Llamada a la API de contenedores
    fetch('http://127.0.0.1:8000/containers/')
      .then((response) => response.json())
      .then((data) => {
        setContainersCount(data.length);  // Número de contenedores
      })
      .catch((error) => console.error('Error fetching containers:', error));

    // Llamada a la API de imágenes
    fetch('http://127.0.0.1:8000/images/')
      .then((response) => response.json())
      .then((data) => {
        setImagesCount(data.images.length);  // Número de imágenes
      })
      .catch((error) => console.error('Error fetching images:', error));

    // Llamada a la API de volúmenes
    fetch('http://127.0.0.1:8000/volumes/')
      .then((response) => response.json())
      .then((data) => {
        setVolumesCount(data.length);  // Número de volúmenes
      })
      .catch((error) => console.error('Error fetching volumes:', error))
      .finally(() => {
        setLoading(false);  // Finaliza el estado de carga
      });
  }, []);  // Este efecto solo se ejecuta una vez cuando el componente se monta

  // Mientras se está cargando la información, mostramos un indicador de carga
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Docker Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Card for Containers */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Containers</Typography>
              <Typography variant="h4">{containersCount}</Typography>
              <Link to="/containers">See Details</Link>
             
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Images */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Images</Typography>
              <Typography variant="h4">{imagesCount}</Typography>
              <Link to="/images">See Details</Link>
            
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Volumes */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Volumes</Typography>
              <Typography variant="h4">{volumesCount}</Typography>
              <Link to="/volumes">See Details</Link>
           
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
