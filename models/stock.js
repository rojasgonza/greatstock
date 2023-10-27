const Sequelize = require('sequelize');
const db = require('../config/config');
const Proveedor = require('./proveedor')
const Stock = db.define('stocks', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.STRING
    },
    aclaraciones: {
        type: Sequelize.STRING
    }
}, { timestamps: false })

Stock.Proveedor = Stock.belongsTo(Proveedor, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
module.exports = Stock;