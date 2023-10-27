const Proveedor = require('../models/proveedor')

//nuevo proveedor
exports.nuevoProveedor = async (req,res) => {
    const {nombre} = req.body;
    const proveedor = await Proveedor.create({nombre})
    if(proveedor){
        res.json({mensaje: "Proveedor creado"})
    } else {
        console.log(error);
    }
}

//mostrar proveedor
exports.mostrarProveedores = async (req, res, next) => {
    const proveedores = await Proveedor.findAll({});
    if(!proveedores){
        console.log(error);
        next()
    }
    res.json(proveedores)
}

// mostrar proveedor
exports.mostrarProveedor = async (req, res, next) => {
    let condition = {where: {id: req.params.idProveedor}}
    const proveedor = await Proveedor.findOne(condition)
    if(!proveedor){
        res.json({mensaje: "no existe el proveedor"})
        next()
    }
    res.json(proveedor)
}

//editar proveedor
exports.editarProveedor = async (req, res, next) => {
    let condition = { where: {id: req.params.idProveedor}}
    const proveedor = await Proveedor.update({
        nombre: req.body.nombre
    }, condition)
    res.json({mensaje: "Editado correctamente"})
}

// borrar proveedor
exports.borrarProveedor = async (req, res, next) => {
    let condition = { where: { id: req.params.idProveedor }}
    const proveedor = await Proveedor.destroy(condition)
    if (!proveedor) {
        console.log(error);
        next()
    }
    res.json({mensaje: "Proveedor eliminado correctamente"})
}