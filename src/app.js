// PODEMOS HACER ESTO PORQUE ISNTALAMOS BABEL, SINO TENEMOS QUE USAR EL REQUIRE
import express from "express";
import indexRoutes from "./routes/index.routes";
// import exphbs from "express-handlebars";
import path from "path";
import { engine } from "express-handlebars";
import morgan from "morgan";

const app = express();

// DIRNAME VALE DONDE ESTAS PARADO EN ESTE MOMENTO ABSOLUTAMENTE PERO PUEDE FALLAR EN DISTINTAS PLATAFORMAS
// CON LA IMPORTACION DE PATH LO HACEMOS MULTIPLATAFORMA
// INDICAMOS DONDE ESTA LA CARPETA VIEWS
app.set("views", path.join(__dirname, "views"));
// ASI LE PODEMOS DECIR A EXPRESS QUE ESTAREMOS USANDO ARCHIVOS HANDLEBARS
app.engine(
  ".hbs",
  engine({
    // DONDE VAN A ESTAR NUESTRAS VISTAS
    // LE DECIMOS EN QUE CARPETA ESTA
    // TODO ESTO SE VA A TRANSFORMAR EN MI DIRECTORIO
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    // QUE TIPO DE EXTENSION VAMOS A USAR
    extname: ".hbs",
  })
);
// LE INDICAMOS QUE VAMOS A USAR HANDLEBARS
app.set("view engine", ".hbs");

// MIDDLEWARES
// NOS PERMITE VER POR CONSOLA LO QUE VAMOS INTERACTUANDO CON LA APP
app.use(morgan("dev"));
// NOS PERMITE LEER EL JSON
app.use(express.urlencoded({ extended: false }));
// ROUTES
app.use(indexRoutes);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

export default app;
