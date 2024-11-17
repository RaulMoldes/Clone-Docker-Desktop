class ImageModel {
    constructor({
      name,
      tag = null
    }) {
      this.name = name;
      this.tag = tag;
    }
  
    // Método para convertir los datos del formulario en el modelo
    static fromFormData(formData) {
      return new ImageModel({
        name: formData.name,
        tag: formData.tag || null
      });
    }
  
    // Método para obtener los datos de la imagen como un objeto que se puede enviar a un servidor
    toJSON() {
      return {
        name: this.name,
        tag: this.tag,
      };
    }
  }
  
  export default ImageModel;
  