const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public'))); // Sirve archivos estáticos de la carpeta 'public'
app.use('/CSS', express.static(path.join(__dirname, '..', 'CSS'))); // Asegúrate de servir la carpeta CSS

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'principal.html'));
});

// Ruta para la página de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'registro.html'));
});

// Manejar el registro de usuarios
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], function(err) {
        if (err) {
            return res.status(400).send('Error al registrar el usuario: ' + err.message);
        }
        res.send('Usuario registrado con éxito');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});