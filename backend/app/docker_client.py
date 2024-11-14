import docker

class DockerClient:
    def __init__(self):
        try:
            self.client = docker.from_env()
        except Exception as e:
            print("Running this application requires docker. Do you have docker installed and running?")
            exit(1)

    def get_client(self):
        return self.client



    