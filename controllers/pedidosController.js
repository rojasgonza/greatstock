const db = require('../config/config')
const Pedido = require('../models/pedidos')

exports.nuevoPedido = async (req, res, next) => {
    try {
        const { id, fecha, mensaje } = req.body
        const pedido = await Pedido.create({ id, fecha, mensaje })
        if (!pedido) {
            console.log('error al crear');
            next()
        }
        res.json({ mensaje: 'Creado correctamente' })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedido.findAll({})
        res.json(pedidos)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedido.findOne({ where: { id: req.params.id } })
        res.json(pedido)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

exports.eliminarPedido = async (req, res, next) => {
    let condition = { where: { id: req.params.id } }
    try {
        const movimiento = await Pedido.destroy(condition)
        res.json({ mensaje: 'eliminado' })
    } catch (error) {
        console.log(error);
        next()
    }
}
