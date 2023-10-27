const Sequelize = require('sequelize')
const db = require('../config/config')

const Proveedor = db.define('proveedores',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING
    }
}, {timestamps:false})
module.exports = Proveedor;