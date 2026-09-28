// Importar Express.
const express = require("express");

// Crear la aplicación.
const app = express();

// Permitir que la aplicación reciba datos en formato JSON.
app.use(express.json());

/*
 * Arreglo temporal para almacenar los usuarios.
 * Para este ejercicio académico se utilizará como
 * almacenamiento de datos.
 */
const usuarios = [];

// Ruta principal para comprobar que la API funciona.
app.get("/", (req, res) => {
    res.send("API de autenticación funcionando correctamente");
});

/*
 * Servicio para registrar un nuevo usuario.
 */
app.post("/api/auth/registro", (req, res) => {
    // Obtener el usuario y la contraseña enviados.
    const { usuario, password } = req.body;

    // Validar que el usuario y la contraseña sean obligatorios.
    if (!usuario || !password) {
        return res.status(400).json({
            error: "El usuario y la contraseña son obligatorios"
        });
    }

    // Verificar si el usuario ya se encuentra registrado.
    const usuarioExiste = usuarios.find(
        u => u.usuario === usuario
    );

    // Evitar el registro de usuarios duplicados.
    if (usuarioExiste) {
        return res.status(409).json({
            error: "El usuario ya se encuentra registrado"
        });
    }

    // Guardar temporalmente el nuevo usuario.
    usuarios.push({ usuario, password });

    // Responder que el registro fue realizado correctamente.
    return res.status(201).json({
        mensaje: "Usuario registrado correctamente"
    });
});

/*
 * Servicio para iniciar sesión.
 */
app.post("/api/auth/login", (req, res) => {
    // Obtener el usuario y la contraseña enviados.
    const { usuario, password } = req.body;

    // Validar que el usuario y la contraseña sean obligatorios.
    if (!usuario || !password) {
        return res.status(400).json({
            error: "El usuario y la contraseña son obligatorios"
        });
    }

    // Buscar un usuario que coincida con las credenciales enviadas.
    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    // Validar si las credenciales son incorrectas.
    if (!usuarioEncontrado) {
        return res.status(401).json({
            error: "Error en la autenticación"
        });
    }

    // Responder cuando la autenticación sea correcta.
    return res.status(200).json({
        mensaje: "Autenticación satisfactoria"
    });
});

// Puerto donde se ejecutará el servidor.
const PORT = 3000;

// Iniciar el servidor.
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});