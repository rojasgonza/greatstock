const Sequelize = require('sequelize');
const db = require('../config/config')

const Pedido = db.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.TEXT
    }
}, { timestamps: false })

module.exports = Pedido;