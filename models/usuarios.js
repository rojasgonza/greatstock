const Sequelize = require('sequelize')
const db = require('../config/config')

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        lower: true,
        trim: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
    },
    nivel: {
        type: Sequelize.INTEGER
    }


})
module.exports = Usuarios