// backend/models/Alumno.js
const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema({
  fechaIngreso: Date,
  fechaBaja: Date,
  habitacion: String,
  matricula: String,
  nombre: { type: String, required: true },
  fechaNacimiento: Date,
  edad: Number,
  sexo: String,
  cuil: String,
  nacionalidad: String,
  localidad: String,
  nombreResponsable: String,
  parentesco: String,
  nacionalidadResponsable: String,
  sexoResponsable: String,
  ocupacion: String,
  cuilResponsable: String,
  domicilio: String,
  telefono: String,
  localidadResponsable: String,
  distrito: String,
  escuela: String,
  anio: String,
  tipoEscuela: String,
  jurisdiccion: String,
  diagnostico: String,
  docenteDesignada: String,
  permanencia: String,
  transitorio: String,
  observaciones: String,
  gravedad: String
});

module.exports = mongoose.model("Alumno", alumnoSchema);
