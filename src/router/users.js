//archivo para manejar las rutas de usuarios

import { Router } from "express";
import { createUsers, login } from "../controller/users.js";
import { authenticateToken, getDatos } from "../security/auth.js";
//objeto para manejo de url
const routerUsers = Router();

/**
 * @swagger
 * /:
 *  post:
 *      sumary: crea usuarios
 */
routerUsers.post("/", createUsers);
routerUsers.get("/", (req, res) => {
    res.send("Ruta de usuarios");
}); // GET /users
routerUsers.post("/login", login); // POST /users/login
routerUsers.get("/me", authenticateToken, getDatos); // Ruta privada

export default routerUsers;