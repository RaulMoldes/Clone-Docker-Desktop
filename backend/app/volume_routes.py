from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.docker_client import DockerClient
from app.models.volumes import VolumeModel
from docker import errors

volume_router = APIRouter()
client = DockerClient().get_client()



# Get the list of all volumes
@volume_router.get("/")
def list_volumes():
    try:
        # Obtener la lista de volúmenes
        volumes = client.volumes.list()

        if not volumes:
            # If no volumes found, return an appropriate message
            return JSONResponse(status_code=200, content={"message": "No volumes found"})

        volume_info = []
        for volume in volumes:
            volume_data = {
                "id": volume.id,
                "name": volume.name,
                "driver": volume.attrs.get('Driver', 'N/A'),
                "mountpoint": volume.attrs.get('Mountpoint', 'N/A'),
            }

            volume_info.append(volume_data)

        return JSONResponse(status_code=200, content=volume_info)

    except errors.DockerException as e:
        # Handle specific Docker errors
        return JSONResponse(status_code=500, content={"error": f"Docker error: {str(e)}"})
    except Exception as e:
        # General error handling
        return JSONResponse(status_code=500, content={"error": f"Error fetching volumes: {str(e)}"})

# Create a new volume
@volume_router.post("/create")
def create_volume(volume: VolumeModel):
    try:
        name = volume.name
        # Check if the volume already exists before trying to create it
        existing_volumes = client.volumes.list(filters={"name": name})
        if existing_volumes:
            raise HTTPException(status_code=400, detail=f"Volume '{name}' already exists.")

        # Create the new volume
        volume = client.volumes.create(name = name, driver = volume.driver, mountpoint = volume.mountpoint)

        return JSONResponse(status_code=201, content={"message": f"Volume '{volume.name}' created successfully", "name": volume.name})

    except errors.DockerException as e:
        return JSONResponse(status_code=500, content={"error": f"Docker error: {str(e)}"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Error creating volume: {str(e)}"})

# Get details of a specific volume by its name
@volume_router.get("/details/{volume_name}")
def volume_details(volume_name: str):
    try:
        # Get volume by name
        volume = client.volumes.get(volume_name)

        # Extract the relevant details
        volume_data = volume.attrs

        return JSONResponse(status_code=200, content=volume_data)

    except errors.NotFound as e:
        # Handle case where volume is not found
        return JSONResponse(status_code=404, content={"error": f"Volume '{volume_name}' not found."})
    except errors.DockerException as e:
        # Handle specific Docker errors
        return JSONResponse(status_code=500, content={"error": f"Docker error: {str(e)}"})
    except Exception as e:
        # General error handling
        return JSONResponse(status_code=500, content={"error": f"Error fetching volume details: {str(e)}"})

# Delete a volume
@volume_router.delete("/delete")
def remove_volume(volume: VolumeModel):
    try:
        volume_name = volume.name

        # Get volume by name
        volume = client.volumes.get(volume_name)

        # Remove the volume
        volume.remove()

        return JSONResponse(status_code=200, content={"message": f"Volume '{volume_name}' removed successfully"})

    except errors.NotFound as e:
        return JSONResponse(status_code=404, content={"error": f"Volume '{volume_name}' not found."})
    except errors.DockerException as e:
        return JSONResponse(status_code=500, content={"error": f"Docker error: {str(e)}"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Error removing volume: {str(e)}"})
