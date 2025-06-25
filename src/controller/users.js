import { pool } from "../databases.js";
import { compareWithBcrypt, hashWithBcrypt } from "../security/hash.js";
import { generarToken } from "../security/auth.js";
const secret = process.env.SECRET_KEY;

//crear usuarios desde el sigup
export const createUsers = async(req, res) => {
  try {
    const { dni, nombre, apellido, mail, contrasena, is_profe } = req.body; //esto viene desde el front

    const passwordHash = await hashWithBcrypt(contrasena);

    const sql =
      "INSERT INTO usuarios (dni, nombre, apellido, mail, contrasena, is_profe) VALUES (?,?,?,?,?,?)";
    const [row] = await pool.query(sql, [
      dni,
      nombre,
      apellido,
      mail,
      passwordHash,
      is_profe,
    ]);
    
    if (row.affectedRows === 1) {
      // Generar el token usando el dni del usuario
      console.log("DNI para el token:", dni);
      const token = generarToken({ sub: dni });
      res.setHeader("Authorization", `Bearer ${token}`); // Establecer el token en la cabecera de la respuesta
      return res
        .status(201)
        .json({
          message: "Usuario creado correctamente",
          token: token,
          user: {
            dni,
            nombre,
            apellido,
            mail,
            is_profe
          },
        });
    } else {
      return res
        .status(400)
        .json({ message: "Error al crear usuario" });
    }
  } catch (error) {
    console.log("error al crear usuario", error.message);
    return res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { mail, contrasena } = req.body; //esto viene desde el front
    
    const sql = "SELECT * FROM usuarios WHERE mail = ?";
    const [row] = await pool.query(sql, [mail]);

    if (row.length === 0) {
      return res.status(404).send("Usuario no encontrado");
    }
    const user = rows[0];
    console.log("contrasena del usuario:", contrasena);
    console.log("contrasena hasheada del usuario:", user.contrasena);
    const isPasswordValid = await compareWithBcrypt(contrasena, user.Contrasena);
    if (!isPasswordValid) {
      return res.status(401).send("contrasena incorrecta");
    }

   // Generar el token usando el dni del usuario encontrado
    console.log("Es profe?", user.is_profe);
    const token = generarToken({ sub: user.DNI, is_profe: user.is_profe });

    return res.status(200).json({
      success: true,
      token: token,
      message: "Inicio de sesión",
      user: {
        dni: user.dni,
        nombre: user.nombre,
        apellido: user.apellido,
        mail: user.mail,
        is_profe: user.is_profe,
      }
    });

  } catch (error) {
    console.log("error al iniciar sesión", error.message);
    return res.status(400).send(error.message);
  }
}



export async function getMe(req, res) {
  try {
    const dni = req.user.sub; // El DNI viene del token
    console.log("DNI del usuario:", req.user);
    const sql = "SELECT * FROM usuarios WHERE dni = ?";
    const [rows] = await pool.query(sql, [dni]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];
    return res.status(200).json({
      dni: user.dni,
      nombre: user.nombre,
      apellido: user.apellido,
      mail: user.mail,
      is_profe: user.is_profe,
    });
  } catch (error) {
    console.log("error al obtener datos", error.message);
    return res.status(500).json({ message: "Error del servidor" });
  }
};