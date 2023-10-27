const CuentaCorriente = require('../models/cc')
const db = require('../config/config');



///unir por cliente
exports.ccc = async (req, res, next) => {
    const venta = await CuentaCorriente.findAll({});
    if (!venta) {
        console.log(error)
        next()
    }
    res.json(venta)
}

//buscar por cliente
exports.cuentaxcliente = async (req, res, next) => {
    const venta = await CuentaCorriente.findAll({});
    if (!venta) {
        console.log(error)
        next()
    }
    res.json(venta)
}

exports.nuevaCC = async (req, res, next) => {
    const { id, fecha, ingreso, salida, aclaraciones } = req.body;
    const cc = await CuentaCorriente.create({ id, fecha, ingreso, salida, fecha, aclaraciones })
    if (!cc) {
        console.log(error)
        next()
    }
    res.json({ mensaje: "creado la cc" })
}

exports.mostrarCCS = async (req, res, next) => {
    const ccs = await CuentaCorriente.findAll({})
    if (!ccs) {
        console.log(error);
        next()
    }
    res.json(ccs);
};
exports.mostrarCC = async (req, res, next) => {
    let condition = { where: { id: req.params.idCC } }
    const cc = await CuentaCorriente.findOne(condition)
    if (!cc) {
        console.log(error);
        next()
    }
    res.json(cc);
};

exports.editarCC = async (req, res, next) => {
    let condition = { where: { id: req.params.idCC } }
    const cc = await CuentaCorriente.update({
        fecha: req.body.fecha,
        ingreso: req.body.total,
        salida: req.body.acuenta,
        aclaraciones: req.body.aclaraciones
    }, condition)
    if (!cc) {
        console.log(error);
        next()
    }
    res.json({ mensaje: "editado el cc" })
}

exports.borrarCC = async (req, res, next) => {
    let condition = { where: { id: req.params.idCC } }
    try {
        const cc = await CuentaCorriente.destroy(condition)
        if (cc) {
            res.json({ mensaje: "cc borrado" })
        }

    } catch (error) {
        console.log(error);
        next()
    }
}

exports.totalCC = async (req, res, next) => {
    const cc = await db.query("SELECT SUM(ingreso)-SUM(salida) as saldoPendiente FROM cuentacorrientes")
    if (!cc) {
        console.log(error);
        next()
    }
    res.json(cc[0])
}