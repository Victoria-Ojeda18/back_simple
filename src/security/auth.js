import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;


export function generarToken(payload) {
    const secretKey = process.env.SECRET_KEY;
    const options = {
        expiresIn: '1h' // El token expirará en 1 hora
    };
    return jwt.sign(payload, secretKey, options);
}

export function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
    jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido o expirado' });
        }
        req.user = payload.sub;
        next();
    });
}