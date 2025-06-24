//este archivo nos permitira conectarnos con la base de datos

import { config } from "./config";
import mysql from "mysql2/promise";

export const pool =  mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
  connectionLimit: 10, // Limite de conexiones simultaneas
  waitForConnections: true, // Esperar por conexiones disponibles
  queueLimit: 0 // Sin limite de espera en la cola
});