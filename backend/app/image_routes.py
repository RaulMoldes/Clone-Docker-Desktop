from fastapi import APIRouter
from app.docker_client import DockerClient

image_router = APIRouter()
client = DockerClient().get_client()

@image_router.get("/")
def list_images():
    images = client.images.list()
    return [{"id": img.id, "tags": img.tags} for img in images]

@image_router.post("/pull")
def pull_image(image_name: str):
    image = client.images.pull(image_name)
    return {"id": image.id, "tags": image.tags}

@image_router.delete("/{image_id}")
def remove_image(image_id: str):
    client.images.remove(image_id)
    return {"message": f"Image {image_id} removed"}
