const Insumo = require('../models/insumos')

//nuevo insumo
exports.nuevoInsumo = async (req, res) => {
    const { nombre, propio, precio } = req.body;
    const insumo = await Insumo.create({ nombre, propio, precio })
    if (insumo) {
        res.json({ mensaje: "Insumo creado" })
    } else {
        console.log(error);
    }
}

//mostrar insumos
exports.mostrarInsumos = async (req, res, next) => {
    const insumos = await Insumo.findAll({});
    if (!insumos) {
        console.log(error);
        next()
    }
    res.json(insumos)
}
//mostrar insumos propios
exports.mostrarInsumosPropios = async (req, res, next) => {
    const insumos = await Insumo.findAll({ where: { propio: true } });
    if (!insumos) {
        console.log(error);
        next()
    }
    res.json(insumos)
}
// mostrar insumo
exports.mostrarInsumo = async (req, res, next) => {
    let condition = { where: { id: req.params.idInsumo } }
    const insumo = await Insumo.findOne(condition)
    if (!insumo) {
        res.json({ mensaje: "no existe el insumo" })
        next()
    }
    res.json(insumo)
}

//editar insumo
exports.editarInsumo = async (req, res, next) => {
    let condition = { where: { id: req.params.idInsumo } }
    const insumo = await Insumo.update({
        nombre: req.body.nombre,
        propio: req.body.propio,
        precio: req.body.precio
    }, condition)
    res.json({ mensaje: "Editado correctamente" })
}
exports.editarInsumosMasivamente = async (req, res, next) => {
    try {
        const insumosEditados = req.body; // Los datos de insumos editados desde el cliente
        for (const insumo of insumosEditados) {
            const condition = { where: { id: insumo.id } };
            await Insumo.update(
                {
                    precio: insumo.precio,
                },
                condition
            );
        }
        res.json({ mensaje: 'Insumos editados correctamente' });
    } catch (error) {
        console.error('Error al editar insumos masivamente:', error);
        res.status(500).json({ mensaje: 'Error al editar insumos' });
    }
};
// borrar insumo
exports.borrarInsumo = async (req, res, next) => {
    let condition = { where: { id: req.params.idInsumo } }
    const insumo = await Insumo.destroy(condition)
    if (!insumo) {
        console.log(error);
        next()
    }
}