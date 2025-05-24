export function normalizeWorker(data) {
  // data es el objeto que viene de la API
  // y lo normalizamos para que coincida con los nombres de los campos del formulario
  return {
    primerNombre:    data.primer_nombre,
    segundoNombre:   data.segundo_nombre,
    apellidos:       data.apellidos,
    fechaNacimiento: data.fecha_nacimiento,      // date inputs want YYYY-MM-DD
    genero:          // map the backend enum into your form’s options
      data.genero === "MASCULINO" ? "M"
    : data.genero === "FEMENINO"  ? "F"
    : data.genero === "NO_BINARIO" ? "O"
    :                              "N",
    correo:     data.correo,
    celular:    data.celular,
    noDocumento:data.nro_documento,
    tipoDocumento:data.tipo_documento
  };
}

export function toApiPayload(form) {
  return {
    // form es el objeto que viene del formulario
    // y lo transformamos para que coincida con los nombres de los campos de la API
    primer_nombre:    form.primerNombre,
    segundo_nombre:   form.segundoNombre || null,  // if optional
    apellidos:        form.apellidos,
    fecha_nacimiento: form.fechaNacimiento,         // already YYYY-MM-DD
    genero:
      form.genero === "M" ? "MASCULINO"
    : form.genero === "F" ? "FEMENINO"
    : form.genero === "O" ? "NO_BINARIO"
    :                       "PREFIERO_NO_REPORTAR",
    correo:      form.correo,
    celular:     form.celular,
    nro_documento: form.noDocumento,
    tipo_documento: form.tipoDocumento 
  };
}