from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.docker_client import DockerClient
from app.models.image import ImageModel

# Inicializamos el cliente de Docker
client = DockerClient().get_client()

image_router = APIRouter()



# Método para hacer pull de una imagen
@image_router.post("/pull/{image_name}")
def pull_image(image_name: str):
    try:
        # Intentamos obtener la imagen con docker pull
        image = client.images.pull(image_name)
        return JSONResponse(
            status_code= 200,
            content={"id": image.id, "tags": image.tags}
        )
    except Exception as e:
        # Si ocurre un error, respondemos con un error HTTP 400
        return JSONResponse(
            status_code=400,
            content={"message": f"Error al descargar la imagen: {str(e)}"}
        )

# Método para eliminar una imagen
@image_router.delete("/delete")
def remove_image(image: ImageModel):
    try:
        # Intentamos eliminar la imagen
        client.images.remove(image.name)
        return JSONResponse(
            status_code=200,
            content={"message": f"Imagen {image.name} eliminada correctamente."}
        )
    except Exception as e:
        # Si ocurre un error, respondemos con un error HTTP 400
        return JSONResponse(
            status_code=400,
            content={"message": f"Error al eliminar la imagen: {str(e)}"}
        )

# Método para obtener la lista de imágenes
@image_router.get("/")
def get_docker_images():
    try:
        # Obtenemos una lista de imágenes del cliente Docker
        images = client.images.list()
        image_info = []

        # Recorremos las imágenes y las formateamos
        for image in images:
            image_info.append({
                "id": image.id,
                "name": image.tags[0] if image.tags else "untagged",
                "size": image.attrs['Size'],  # Tamaño en bytes
                "tag": image.tags[0].split(":")[1] if len(image.tags) > 0 else "latest",
            })

        return JSONResponse(
            status_code=200,
            content={"images": image_info}
        )
    except Exception as e:
        # En caso de error, respondemos con un error HTTP 500
        return JSONResponse(
            status_code=500,
            content={"message": f"Error al obtener las imágenes: {str(e)}"}
        )

# Método para construir una imagen desde un Dockerfile
@image_router.post("/build/")
def build_image(dockerfile: str, tag: str = "latest"):
    try:
        # Usamos el cliente Docker para construir la imagen
        image, logs = client.images.build(path=dockerfile, tag=tag, rm=True)

        # Mostramos los logs de la construcción de la imagen
        log_output = []
        for log in logs:
            if 'stream' in log:
                log_output.append(log['stream'])

        return JSONResponse(
            status_code=201,
            content={
                "message": "Imagen construida correctamente.",
                "id": image.id,
                "logs": log_output
            }
        )
    except Exception as e:
        # Si ocurre un error durante la construcción de la imagen, respondemos con error HTTP 400
        return JSONResponse(
            status_code=400,
            content={"message": f"Error al construir la imagen: {str(e)}"}
        )
