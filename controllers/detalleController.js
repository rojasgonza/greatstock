const db = require('../config/config');
const Detalle = require('../models/detalle')

exports.nuevoDetalle = async (req, res, next) => {
    const { ingreso, egreso, monto, insumoId, punit, stockId } = req.body;
    const detalle = await Detalle.bulkCreate(req.body)

    if (!detalle) {
        console.log(error);
        next()
    }
    res.json({ mensaje: "detalle creado" })
}
exports.mostrarDetalles = async (req, res, next) => {
    const detalles = await Detalle.findAll({
        include: [
            { association: Detalle.Insumo },
            { association: Detalle.Stock }
        ]
    })
    if (!detalles) {
        console.log(error);
        next()
    }
    res.json(detalles)
}

exports.mostrarDetalle = async (req, res, next) => {
    let condition = { where: { id: req.params.idDetalle } }
    const detalle = await Detalle.findOne({
        include: [
            { association: Detalle.Insumo },
            { association: Detalle.Stock }
        ], condition
    })
    if (!detalle) {
        console.log(error);
        next()
    }
    res.json(detalle)
}

exports.editarDetalle = async (req, res, next) => {
    let condition = { where: { id: req.params.idDetalle } }
    const detalle = await Detalle.update({
        ingreso: req.body.ingreso,
        egreso: req.body.egreso,
        monto: req.body.monto,
        insumoId: req.body.insumoId,
        stockId: req.body.stockId,
        punit: req.body.punit
    }, condition)
    if (!detalle) {
        console.log(error)
        next()
    }
    res.json({ mensaje: "detalle ACTUALIZADO" })
}
exports.borrarDetalle = async (req, res, next) => {
    let condition = { where: { id: req.params.idDetalle } }
    const detalle = await Detalle.destroy(condition)
    if (!detalle) {
        console.log(error)
        next()
    }
    res.json({ mensaje: "detalle borrado" })
}

exports.detallePorFact = async (req, res, next) => {
    let condition = req.params.idStock
    const detalle = await db.query("SELECT  insumos.nombre, ingreso, egreso, punit, monto FROM detalles LEFT JOIN insumos ON detalles.insumoId = insumos.id WHERE stockId = " + condition + " ;")

    res.json(detalle[0])

}

exports.saldoPorfact = async (req, res, next) => {
    let condition = req.params.idStock
    const detalle = await db.query("SELECT SUM(monto) as total FROM detalles WHERE stockId = " + condition + " ;")

    res.json(detalle[0])

}
