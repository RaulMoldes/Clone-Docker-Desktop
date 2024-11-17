class VolumeModel {
    constructor({
      name,
      driver = null,
      mountpoint = null,
    }) {
      this.name = name;
      this.driver  = driver;
      this.mountpoint = mountpoint;
    }
  
    // Método para convertir los datos del formulario en el modelo
    static fromFormData(formData) {
      return new VolumeModel({
        name: formData.name,
        driver: formData.driver || null,
        mountpoint: formData.mountpoint || null,
      });
    }
  
    // Método para obtener los datos de la imagen como un objeto que se puede enviar a un servidor
    toJSON() {
      return {
        name: this.name,
        driver: this.driver,
        mountpoint: this.mountpoint,
      };
    }
  }
  
  export default VolumeModel;
  