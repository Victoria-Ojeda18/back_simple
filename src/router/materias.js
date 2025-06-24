import { Router } from "express";
import { getMaterias, createMateria } from "../controller/materias.js";
import { authenticateToken, requireProfesor } from "../security/auth.js";

const routerMaterias = Router();

routerMaterias.get("/", authenticateToken, getMaterias);         // GET /materias
routerMaterias.post("/", authenticateToken, requireProfesor, createMateria);      // POST /materias

export default routerMaterias;