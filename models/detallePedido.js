const Sequelize = require('sequelize');
const db = require('../config/config')
const Pedido = require('./pedidos')
const Insumo = require('./insumos')

const DetallePedido = db.define('detallepedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: Sequelize.DECIMAL(10, 2)
    }
}, { timestamps: false })

DetallePedido.Insumo = DetallePedido.belongsTo(Insumo, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
DetallePedido.Pedido = DetallePedido.belongsTo(Pedido, {
    onDelete: 'cascade',
    onDelete: 'cascade'
})
module.exports = DetallePedido