//configuración de express
import express from "express";
import cors from "cors"; //vamos a hacer app, no lo necesitamos
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
import routerMaterias from "./router/materias"; // Importamos las rutas de materias
const spec = swaggerJSDoc(options);

import user from "./router/users";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use("/users", user); // Ruta para manejar usuarios
app.use("/materias", routerMaterias); // Ruta para manejar materias

//documentacion
app.use("/docs", swaggerUI.serve, swaggerUI.setup(spec));

export default app;
