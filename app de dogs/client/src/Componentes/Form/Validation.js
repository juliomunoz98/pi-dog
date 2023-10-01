function validation(inputs) {
    const regexImage = /^(ftp|http|https):\/\/[^ "]+$/;
    const errors = {};

    if (inputs.name.length === 0) {
        errors.name = "Este campo no puede estra vacio"
    }
    if (inputs.name.length > 35) {
        errors.name = "Este campo no puede exceder los 35 caracteres"
    }
    if (inputs.height.length === 0) {
        errors.height = "Este campo no puede estar vacio"
    }
    if (inputs.weight === 0) {
        errors.weight = "Este campo no puede estar vacio"
    }
    if (inputs.years.length === 0) {
        errors.years = "El indice no puede ser 0"
    }
    if (inputs.temperaments.length > 400) {
        errors.temperaments = "Este campo no puede superar los 400 caracteres"
    }
    if (!regexImage.test(inputs.image)) {
        errors.image = "Este campo debe ser una URL"
    }

    return errors;
}
export default validation;