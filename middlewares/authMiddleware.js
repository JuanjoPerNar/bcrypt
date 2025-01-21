const jwt = require('jsonwebtoken');
const { hashedSecret } = require('../crypto/config');

// Generar el token. No es un middleware
//jwt.sign(datos para generar token, secreto, opciones)
function generateToken(user) {
    return jwt.sign({user: user.id}, hashedSecret, { expiresIn: '1h'});
}

// Verificar el token. Es un middleware
function verifyToken(req, res, next) {
    const token = req.session.token;
    if (!token) {
        return res.status(401).json({mensaje: 'Token no generado'});
    }
    jwt.verify(token, hashedSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({mensaje: 'Token inválido'});
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = { generateToken, verifyToken };