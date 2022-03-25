import mongoose from "mongoose";
// IMPORTAMOS DESDE EL CONFIG LA URI DE LA DB
import { MONGODB_URI } from "./config";
(async () => {
  try {
    // LE INDICAMOS DE QUE MANERA Y A DONDE CONECTARSE PARA ENCONTRAR LA DB
    const db = await mongoose.connect(MONGODB_URI);
    console.log("DB conected to", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
