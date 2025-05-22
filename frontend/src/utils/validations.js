function isValidTextInput(input) {
    const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return onlyLetters.test(input);
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}
function isValidDocumentNumber(documentNumber) {
    const documentNumberRegex = /^\d{10}$/;
    return documentNumberRegex.test(documentNumber);
}

export function validateForm(form){
    const errors = {};
    if (form.primerNombre.length > 30) {
        errors.primerNombre = ["El primer nombre no puede tener más de 30 caracteres"];
    }
    if (!isValidTextInput(form.primerNombre) ) {
        errors.primerNombre = ["El primer nombre solo puede contener letras y espacios"];
    }
    if (form.segundoNombre.length > 30) {
        errors.segundoNombre = ["El segundo nombre no puede tener más de 30 caracteres"];
    }
    if (!isValidTextInput(form.segundoNombre) && form.segundoNombre.length > 0) {
        errors.segundoNombre = ["El segundo nombre solo puede contener letras y espacios"];
    }
    if (form.apellidos.length > 60) {
        errors.apellidos = ["Los apellidos no pueden tener más de 60 caracteres"];
    }
    if (!isValidTextInput(form.apellidos)) {
        errors.apellidos = ["Los apellidos solo pueden contener letras y espacios"];
    }
    if (!isValidEmail(form.correo)) {
        errors.correo = ["El correo electrónico no es válido"];
    }
   if (!isValidPhoneNumber(form.celular)) {
        errors.celular = ["El número de celular debe tener 10 dígitos"];
    }
    if (!isValidDocumentNumber(form.noDocumento)) {
        errors.noDocumento = ["El número de documento debe 10 dígitos"];
    }
    return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}