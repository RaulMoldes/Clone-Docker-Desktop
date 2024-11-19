# DockerDesk

DockerDesk es un clon de Docker Desktop desarrollado con Python para el backend y React.js para el frontend. Permite administrar contenedores Docker, imágenes, volúmenes y redes a través de una interfaz gráfica intuitiva, de manera similar a Docker Desktop, pero con una arquitectura personalizable y extensible.

# Características

- Interfaz gráfica para gestionar contenedores Docker.
- Creación, eliminación y administración de imágenes Docker.
- Gestión de volúmenes y redes Docker.
- Visualización de logs y estado de los contenedores en tiempo real.
- Interacción sencilla con el Docker Engine a través de API RESTful en el backend.

# Tecnologías

- Frontend: React.js, Material-UI
- Backend: Python, FastAPI
- Contenedores: Docker
- Gestión de Contenedores: Docker SDK para Python

# Instalación

## Prerrequisitos

- Docker: Asegúrate de tener Docker instalado y ejecutándose en tu máquina. Puedes instalar Docker desde aquí.

### 1. Clonando el repositorio

`git clone https://github.com/RaulMoldes/docker-desk.git`
`cd docker-desk`

### 2. Desplegar infraestructura con docker-compose

`docker-compose up --build`

# Uso

1. Accede a la interfaz de usuario en http://localhost:3000.
2. En el backend, la API RESTful se encuentra en http://localhost:8000.
3. Usa la interfaz gráfica para gestionar tus contenedores, imágenes y volúmenes de Docker.
4. Puedes ver los logs y los estados de los contenedores en tiempo real.

## Contribución

¡Las contribuciones son bienvenidas! Si deseas colaborar en el proyecto, sigue estos pasos:

### Haz un fork de este repositorio.

1. Crea una rama para tu nueva característica (git checkout -b feature/nueva-funcionalidad).
2. Realiza los cambios y haz commit de ellos (git commit -am 'Agrega nueva funcionalidad').
3. Haz push de tu rama a tu repositorio (git push origin feature/nueva-funcionalidad).
4. Abre un Pull Request para revisión.

## Mejoras posibles

- Implementación de autenticación y autorización de usuarios.
- Integración con más servicios de Docker como redes.
- Soporte para otros sistemas operativos (actualmente soporta Linux, MacOS y Windows).
- Mejoras en la visualización y gestión de logs.
