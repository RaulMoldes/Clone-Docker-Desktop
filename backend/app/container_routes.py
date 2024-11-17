from fastapi import APIRouter, HTTPException
from app.docker_client import DockerClient
from docker.errors import DockerException
from app.models.container import ContainerModel
from fastapi.responses import JSONResponse
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger()

container_router = APIRouter()
client = DockerClient().get_client()

@container_router.get("/")
def list_containers(all:bool=True):
    # Obtener la lista de contenedores
    containers = client.containers.list(all=all)
    
    # Crear la lista con la información de los contenedores, incluyendo la imagen
    container_info = [
        {
            "id": c.id,
            "name": c.name,
            "status": c.status,
            "image": c.image.tags[0] if c.image.tags else "untagged"  # Añadimos la imagen
        }
        for c in containers
    ]
    
    return container_info

@container_router.post("/create")
async def create_container(request: ContainerModel):
    logging.info(f"Received container data: {request.dict()}")
    try:
        # Construcción dinámica de parámetros
        container_params = {
            "image": request.image,
            "name": request.name,
            "detach": True
        }

        # Agregar puertos si existen en request
        if request.ports:
            container_params["ports"] = request.ports

        # Agregar variables de entorno si existen en request
        if request.env_vars:
            container_params["environment"] = request.env_vars

        # Agregar volúmenes si existen en request
        if request.volumes:
            container_params["volumes"] = request.volumes

        # Agregar red si existe en request
        if request.network:
            container_params["network"] = request.network

        # Agregar comando si existe en request
        if request.command:
            container_params["command"] = request.command

        # Configurar política de reinicio si existe en request
        if request.restart_policy:
            container_params["restart_policy"] = request.restart_policy
        else:
            # Por defecto, establece una política de reinicio 'always'
            container_params["restart_policy"] = {"Name": "always"}

        # Configurar healthcheck si existe en request
        if request.healthcheck:
            container_params["healthcheck"] = request.healthcheck

        # Limitar CPU si existe en request
        if request.cpu_quota:
            container_params["cpu_quota"] = request.cpu_quota

        # Limitar memoria si existe en request
        if request.mem_limit:
            container_params["mem_limit"] = request.mem_limit

        # Configurar usuario si existe en request
        if request.user:
            container_params["user"] = request.user

        # Configurar hostname si existe en request
        if request.hostname:
            container_params["hostname"] = request.hostname

        # Configurar etiquetas si existen en request
        if request.labels:
            container_params["labels"] = request.labels

        # Configurar eliminación automática si existe en request
        if request.remove:
            container_params["remove"] = request.remove

        # Configurar opciones de log si existen en request
        if request.log_config:
            container_params["log_config"] = request.log_config

       
        container = client.containers.run(**container_params)

        print(f"Contenedor '{container.name}' iniciado exitosamente con ID: {container.id}")
        return {"statusCode": 200, "message": f"Contenedor '{container.name}' iniciado exitosamente con ID: {container.id}"}
    except DockerException as e:
        print(f"Error al crear el contenedor: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error al crear el contenedor: {str(e)}")
    except Exception as e:
        print(f"Error inesperado: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error inesperado: {str(e)}")

@container_router.post("/start")
async def start_container(container: ContainerModel):
    logger.info(f"Arrancando contenedor: {container.name}")
    try:
      
        container = client.containers.get(container.name)
        container.start()
        return JSONResponse({"message": "Container started"}, status_code=200)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

@container_router.post("/stop")
async def stop_container(container: ContainerModel):
    logger.info(f"Parando contenedor: {container.name}")
    try:
        
        container = client.containers.get(container.name)
        container.stop()
        return JSONResponse({"message": "Container stopped"}, status_code=200)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

@container_router.delete("/delete")
async def delete_container(container: ContainerModel):
    logger.info(f"Borrando contenedor: {container.name}")
    try:
   
        container = client.containers.get(container.name)
        container.remove()
        return JSONResponse({"message": "Container deleted"}, status_code=200)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)
    

@container_router.get("/details/{container_name}")
async def get_container_details(container_name: str):

    try:
        
        container = client.containers.get(container_name)
        print(container)
        details = container.attrs
        return JSONResponse({"details": details}, status_code=200)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)
