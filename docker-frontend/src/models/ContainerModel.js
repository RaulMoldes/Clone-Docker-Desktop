class ContainerModel {
    constructor({
      name,
      image,
      status = 'Running',
      ports = [],
      env_vars = [],
      volumes = [],
      network = null,
      command = null,
      restart_policy = null,
      healthcheck = null,
      cpu_quota = null,
      mem_limit = null,
      user = null,
      hostname = null,
      labels = [],
      remove = false,
      log_config = null
    }) {
      this.name = name;
      this.image = image;
      this.status = status;
      this.ports = ports;
      this.env_vars = env_vars;
      this.volumes = volumes;
      this.network = network;
      this.command = command;
      this.restart_policy = restart_policy;
      this.healthcheck = healthcheck;
      this.cpu_quota = cpu_quota;
      this.mem_limit = mem_limit;
      this.user = user;
      this.hostname = hostname;
      this.labels = labels;
      this.remove = remove;
      this.log_config = log_config;
    }
  
    // Método para convertir los datos del formulario en el modelo
    static fromFormData(formData) {
      return new ContainerModel({
        name: formData.containerName,
        image: formData.image,
        status: 'Running',
        ports: formData.ports ? formData.ports.split(',') : [],
        env_vars: formData.envVars ? formData.envVars.split(',') : [],
        volumes: formData.volumes || [],
        network: formData.network || null,
        command: formData.command || null,
        restart_policy: formData.restartPolicy ? JSON.parse(formData.restartPolicy) : null,
        healthcheck: formData.healthcheck || null,
        cpu_quota: formData.cpuQuota ? parseInt(formData.cpuQuota) : null,
        mem_limit: formData.memLimit || null,
        user: formData.user || null,
        hostname: formData.hostname || null,
        labels: formData.labels || [],
        remove: formData.remove || false,
        log_config: formData.logConfig ? JSON.parse(formData.logConfig) : null
      });
    }
  }
  

export default ContainerModel;