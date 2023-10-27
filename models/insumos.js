const Sequelize = require('sequelize');
const db = require('../config/config')

const Insumo = db.define('insumos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    propio: {
        type: Sequelize.BOOLEAN
    },
    precio :{
        type: Sequelize.DECIMAL(10,2)
    }
})
module.exports = Insumo;