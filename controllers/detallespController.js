const db = require('../config/config');
const DetallePedido = require('../models/detallePedido')

exports.nuevoDetalleP = async (req, res, next) => {
    try {
        const detallep = await DetallePedido.bulkCreate(req.body)
        res.json({ mensaje: 'Detalle creado correctamente' })
    } catch (error) {
        console.error(error);
        next(error)
    }
}

exports.mostrarDetallesFact = async (req, res, next) => {
    try {
        const detalles = await DetallePedido.findAll(
            {
                where: { pedidoId: req.params.id },
                include: [
                    { association: DetallePedido.Insumo },
                    { association: DetallePedido.Pedido }
                ]
            }
        )
        res.json(detalles)
    } catch (error) {
        console.error(error);
        next(error)
    }
}