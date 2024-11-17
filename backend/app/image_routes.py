from fastapi import APIRouter
from app.docker_client import DockerClient
from app.models.image import ImageModel

image_router = APIRouter()
client = DockerClient().get_client()


@image_router.post("/pull")
def pull_image(image_name: str):
    image = client.images.pull(image_name)
    return {"id": image.id, "tags": image.tags}

@image_router.delete("/delete")
def remove_image(image: ImageModel):
    client.images.remove(image.name)
    return {"message": f"Image {image.name} removed"}


@image_router.get("/")
def get_docker_images():
    # Get a list of images using the Docker SDK
    images = client.images.list()
    image_info = []
    
    for image in images:
        image_info.append({
            "id": image.id,
            "name": image.tags[0] if image.tags else "untagged",
            "size": image.attrs['Size'],  # Size in bytes
            "tag": image.tags[0].split(":")[1] if len(image.tags) > 0 else "latest",
        })
    
    return image_info