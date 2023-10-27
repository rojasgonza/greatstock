const Sequelize = require('sequelize')
const db = require('../config/config')
const Insumo = require('./insumos');
const Stock = require('./stock');

const Detalle = db.define('detalles', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ingreso: {
        type: Sequelize.DECIMAL(10,2)
    },
    egreso: {
        type: Sequelize.DECIMAL(10,2)
    },
    monto:{
        type: Sequelize.DECIMAL(10,2)
    },
    punit: {
        type: Sequelize.DECIMAL(10,2)
    }
},  {timestamps: false})
Detalle.Insumo = Detalle.belongsTo(Insumo,{
    onDelete:'cascade',
    onUpdate: 'cascade'
})
Detalle.Stock = Detalle.belongsTo(Stock,{
    onDelete:'cascade',
    onUpdate: 'cascade'
})
module.exports = Detalle;