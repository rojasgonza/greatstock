const Usuarios = require('../models/usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

exports.registrarUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuarios.findOne({ where: { email: req.body.email } });

        if (usuarioExistente) {
            // El correo ya está registrado, responde con un mensaje de error
            return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
        }

        // El correo no está registrado, procede a guardar el usuario
        await usuario.save();
        res.json({ mensaje: 'Usuario creado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
}

exports.iniciarSesion = async (req, res, next) => {
    //buscar
    let condition = { where: { email: req.body.email } }
    const usuario = await Usuarios.findOne(condition)
    if (!usuario) {
        await res.status(401).json({ mensaje: 'usuario no existe' })
        next()
    } else {
        //usuario con mal password
        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            await res.status(401).json({ mensaje: 'password incorrecto' })
            next()
        } else {
            //correcto
            const token = jwt.sign({
                email: usuario.email,
                password: usuario.password,
                nivel: usuario.nivel,
                nombre: usuario.nombre
            }, 'LLAVESECRETA', {
                expiresIn: '5h'
            })
            const datos = {
                nombre: usuario.nombre,
                nivel: usuario.nivel
            }
            //devolver token
            res.json({ token, datos })
        }
    }
}



const crypto = require('crypto');

// Función para generar un token único para la recuperación de contraseña
function generatePasswordResetToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Función para enviar un correo electrónico con el enlace de recuperación de contraseña
async function sendPasswordResetEmail(email, resetToken) {
    const transporter = nodemailer.createTransport({
        // Configuración del transporte de correo (puedes usar diferentes servicios de correo aquí)
        service: 'gmail',
        auth: {
            user: 'rojasgonzalo23@gmail.com',
            pass: 'cbkopalsicqnnnep'
        }
    });

    const resetLink = `${resetToken}`;

    const mailOptions = {
        from: 'great-galpon@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        html: `<p> Para recuperar la contraseña, ingrese este token en el campo "TOKEN": ${resetLink}</p>`
    };

    await transporter.sendMail(mailOptions);
}

// Controlador para enviar el enlace de recuperación de contraseña por correo electrónico
exports.enviarRecuperacionContrasena = async (req, res) => {
    try {
        const { email } = req.body;

        // Verificar si el correo existe en la base de datos
        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Correo electrónico no encontrado' });
        }

        // Generar un token único y guardarlo en la base de datos
        const resetToken = generatePasswordResetToken();
        usuario.resetToken = resetToken;
        usuario.resetTokenExpira = Date.now() + 3600000; // Vence en 1 hora
        await usuario.save();

        // Enviar el correo electrónico con el enlace de recuperación
        await sendPasswordResetEmail(email, resetToken);

        res.json({ mensaje: 'Correo de recuperación enviado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al enviar el correo de recuperación' });
    }
};

// Función para restablecer la contraseña con el token proporcionado
exports.restablecerContrasena = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Verificar si el correo existe y el token es válido
        const usuario = await Usuarios.findOne({
            where: { email }
        });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Token inválido o expirado' });
        }

        // Actualizar la contraseña y limpiar el token de recuperación
        usuario.password = await bcrypt.hash(newPassword, 12);
        usuario.resetToken = null;
        usuario.resetTokenExpira = null;
        await usuario.save();

        res.json({ mensaje: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al restablecer la contraseña' });
    }
};
