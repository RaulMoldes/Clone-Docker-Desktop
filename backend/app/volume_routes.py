from fastapi import APIRouter
from app.docker_client import DockerClient

volume_router = APIRouter()
client = DockerClient().get_client()

@volume_router.get("/")
def list_volumes():
    """Listar todos los volúmenes existentes."""
    volumes = client.volumes.list()
    return [{"name": volume.name, "driver": volume.attrs['Driver']} for volume in volumes]

@volume_router.post("/")
def create_volume(name: str):
    """Crear un nuevo volumen con un nombre especificado."""
    volume = client.volumes.create(name=name)
    return {"message": f"Volume '{volume.name}' created successfully", "name": volume.name}

@volume_router.delete("/{volume_name}")
def remove_volume(volume_name: str):
    """Eliminar un volumen especificado por su nombre."""
    volume = client.volumes.get(volume_name)
    volume.remove()
    return {"message": f"Volume '{volume_name}' removed successfully"}
