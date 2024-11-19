import docker

class DockerClient:
    def __init__(self):
        try:
            self.client = docker.DockerClient(base_url='unix:///var/run/docker.sock')
        except Exception as e:
            print("Running this application requires docker. Do you have docker installed and running?")
            exit(1)

    def get_client(self):
        return self.client



    