import { Schema, model } from "mongoose";
// TENEMOS EL MODELO DE TAREAS CONFORMADO POR EL ESQUEMA DEBAJO

const bkpSchema = new Schema({
  client: {
    type: String,
    required: true,
    // LIMPIA EL STRING, SACA LOS ESPACIONS EXTRAS AL INICIO Y FIN
    trim: true,
  },
  server: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  bkpType: {
    type: String,
    required: true,
  },
  bkpDate: {
    type: String,
    min: "1900-09-28",
    max: "2100-05-23",
    required: true,
  },
  bkpObservations: {
    type: String,
  },
});

export default model("bkp", bkpSchema);
