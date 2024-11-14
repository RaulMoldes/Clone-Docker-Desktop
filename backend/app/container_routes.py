from fastapi import APIRouter
from app.docker_client import DockerClient

container_router = APIRouter()
client = DockerClient().get_client()

@container_router.get("/")
def list_containers(all: bool = True):
    containers = client.containers.list(all=all)
    return [{"id": c.id, "name": c.name, "status": c.status} for c in containers]

@container_router.post("/")
def create_container(image: str, name: str = None):
    container = client.containers.run(image, detach=True, name=name)
    return {"id": container.id, "name": container.name, "status": container.status}

@container_router.post("/{container_id}/start")
def start_container(container_id: str):
    container = client.containers.get(container_id)
    container.start()
    return {"message": f"Container {container.name} started"}

@container_router.post("/{container_id}/stop")
def stop_container(container_id: str):
    container = client.containers.get(container_id)
    container.stop()
    return {"message": f"Container {container.name} stopped"}

@container_router.delete("/{container_id}")
def remove_container(container_id: str):
    container = client.containers.get(container_id)
    container.remove()
    return {"message": f"Container {container.name} removed"}
