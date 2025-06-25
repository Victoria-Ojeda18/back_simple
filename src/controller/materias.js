import { pool } from "../databases";

// Obtener todas las materias
export const getMaterias = async (req, res) => {
    try {
    const [rows] = await pool.query("SELECT * FROM materias");
    res.status(200).json(rows);
    } catch (error) {
    console.log("Error al obtener materias:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Crear una materia
export const createMateria = async (req, res) => {
    try {
        const { Profesor_ID, Nombre, horario } = req.body;
        const sql = "INSERT INTO materias (Profesor_ID, Nombre, horario) VALUES (?, ?, ?)";
        const [result] = await pool.query(sql, [Profesor_ID, Nombre, horario]);
        if (result.affectedRows === 1) {
            return res.status(201).json({ message: "Materia creada correctamente" });
        } else {
            return res.status(400).json({ message: "No se pudo crear la materia" });
        }
    } catch (error) {
        console.log("Error al crear materia:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};