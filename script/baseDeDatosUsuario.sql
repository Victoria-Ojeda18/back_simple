-- Tabla de usuarios
CREATE TABLE usuarios (
    dni CHAR(8) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    mail VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    is_profe BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de materias
CREATE TABLE materias (
    id INT(5) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    profesor_id CHAR(8),
    dia VARCHAR(20) NOT NULL,
    horario VARCHAR(20) NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES usuarios(dni)
);

-- Tabla intermedia para inscripciones (alumnos en materias)
CREATE TABLE inscripciones (
    alumno_id CHAR(8),
    materia_id INT(5),
    PRIMARY KEY (alumno_id, materia_id),
    FOREIGN KEY (alumno_id) REFERENCES usuarios(dni),
    FOREIGN KEY (materia_id) REFERENCES materias(id)
);