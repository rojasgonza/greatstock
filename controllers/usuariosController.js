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