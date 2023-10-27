const Stock = require('../models/stock')
const db = require('../config/config')

exports.nuevoMovimiento = async (req, res, next) => {
    try {
        const { id, fecha, aclaraciones, proveedoreId } = req.body
        const stock = await Stock.create({ id, fecha, aclaraciones, proveedoreId })
        if (!stock) {
            console.log(error);
            next()
        }
        res.json({ mensaje: "Movimiento creado" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.mostrarFacturas = async (req, res, next) => {
    const movimientos = await Stock.findAll({
        include: [
            { association: Stock.Proveedor }
        ]
    })
    if (!movimientos) {
        console.log(error);
        next()
    }
    res.json(movimientos)
}

exports.mostrarFactura = async (req, res, next) => {
    const movimiento = await Stock.findOne(
        { include: [{ association: Stock.Proveedor }], where: { id: req.params.idStock } }
    )
    if (!movimiento) {
        console.log(error);
        next()
    }
    res.json(movimiento)
}

exports.eliminarFactura = async (req, res, next) => {
    let condition = { where: { id: req.params.idStock } }
    try {
        const movimiento = await Stock.destroy(condition)
        res.json({ mensaje: 'eliminado' })
    } catch (error) {
        console.log(error);
        next()
    }
}

exports.stockActual = async (req, res, next) => {
    try {
        const stock = await db.query('SELECT insumos.id, nombre, propio, SUM(ingreso) - SUM(egreso) AS TOTAL FROM detalles LEFT JOIN insumos ON detalles.insumoId = insumos.id GROUP BY insumos.id;');
        res.json(stock[0]);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.ultimoMovstock = async (req, res, next) => {
    const resultado = await db.query('SELECT AUTO_INCREMENT as ultimoid FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "gb" AND TABLE_NAME = "stocks"')
    try {
        res.json(resultado[0])
    } catch (error) {
        console.log(error);
        next()
    }
}
