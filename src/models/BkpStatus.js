import { Schema, model } from "mongoose";

// TENEMOS EL MODELO DE TAREAS CONFORMADO POR EL ESQUEMA DEBAJO

const bkpStatusSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      // LIMPIA EL STRING, SACA LOS ESPACIONS EXTRAS AL INICIO Y FIN
      trim: true,
    },
  },
  {
    // ESTE NOS PERMITE AÑADIR AUTOMATICAMENTE UNA FECHA DE CREADO Y ACTUALIZADO
    timestamps: true,
  }
);

export default model("bkpStatus", bkpStatusSchema);
