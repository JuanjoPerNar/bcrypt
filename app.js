const express = require('express')
const session = require('express-session');
const { hashedSecret } = require('./crypto/config')
const routes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: hashedSecret, // Clave secreta para generar el token
    resave: false, // false para que cada vez que entre no se recargue y guarde el token
    saveUninitialized: true, // true para que al inicio se guarde la sesión
    cookie: { secure: false }, 
    // Las cookies guardan información de nuestra sesión. Mientras que no cambien,
    //no nos van a pedir aceptarlas de nuevo-->guardo las cookies aceptadas o no en esta sesión
    //secure --> usamos http en desarrollo, entonces secure: false
    //Cuando hacemos un despliegue y nuestra y nuestra app está en producción, secure: true
}));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`El servidor está ejecutándose en http://localhost:${PORT}`);
});
