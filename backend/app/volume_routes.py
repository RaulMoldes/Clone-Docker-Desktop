from fastapi import APIRouter
from app.docker_client import DockerClient
from app.models.volumes import VolumeModel


volume_router = APIRouter()
client = DockerClient().get_client()


@volume_router.get("/")
def list_volumes():
    try:
        # Obtener la lista de volúmenes
        volumes = client.volumes.list()

        # Si no hay volúmenes
        if not volumes:
            return {"message": "No volumes found"}

        # Extraer la información relevante de cada volumen
        volume_info = []
        for volume in volumes:
            volume_data = {
                "id": volume.id,
                "name": volume.name,
                "driver": volume.attrs.get('Driver', 'N/A'), 
                "mountpoint": volume.attrs.get('Mountpoint', 'N/A'),  # Obtener el punto de montaje
            }

            # Asegurarse de que todos los datos que deseas estén disponibles
            volume_info.append(volume_data)
        
        return volume_info

    except Exception as e:
        # Manejo de errores en caso de fallar la consulta
        return {"error": str(e)}

@volume_router.post("/")
def create_volume(name: str):
    """Crear un nuevo volumen con un nombre especificado."""
    volume = client.volumes.create(name=name)
    return {"message": f"Volume '{volume.name}' created successfully", "name": volume.name}

@volume_router.delete("/delete")
def remove_volume(volume: VolumeModel):
    volume_name = volume.name

    """Eliminar un volumen especificado por su nombre."""
    volume = client.volumes.get(volume_name)
    volume.remove()
    return {"message": f"Volume '{volume_name}' removed successfully"}
