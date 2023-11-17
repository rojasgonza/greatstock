const express = require('express');
const router = express.Router()
const cuentaController = require('../controllers/cuentaController')
const detalleController = require('../controllers/detalleController')
const insumosController = require('../controllers/insumosController')
const proveedorController = require('../controllers/proveedorController')
const stockController = require('../controllers/stockController')
const usuariosController = require('../controllers/usuariosController')
const auth = require('../middleware/auth')
module.exports = function () {
    router.post('/cuenta', auth, cuentaController.nuevaCC)
    router.get('/cuenta', auth, cuentaController.ccc)
    router.get('/cuenta/:idCC', auth, cuentaController.mostrarCC);
    router.put('/cuenta/editar/:idCC', auth, cuentaController.editarCC)
    router.delete('/cuenta/eliminar/:idCC', auth, cuentaController.borrarCC)
    router.get('/saldo', auth, cuentaController.totalCC)

    router.post('/detalle', auth, detalleController.nuevoDetalle)
    router.get('/detalle', auth, detalleController.mostrarDetalles);
    router.get('/detalle/:idDetalle', auth, detalleController.mostrarDetalle);
    ///pendiente detalle por factura
    router.put('/detalle/editar/:idDetalle', auth, detalleController.editarDetalle)
    router.delete('/detalle/eliminar/:idDetalle', auth, detalleController.borrarDetalle)
    router.get('/detalleporfactura/:idStock', auth, detalleController.detallePorFact)
    router.get('/saldoporfactura/:idStock', auth, detalleController.saldoPorfact)

    router.post('/insumos', auth, insumosController.nuevoInsumo)
    router.get('/insumos', auth, insumosController.mostrarInsumos)
    router.get('/insumos-propios', auth, insumosController.mostrarInsumosPropios)
    router.get('/insumos/:idInsumo', auth, insumosController.mostrarInsumo)
    router.put('/insumos/editar/:idInsumo', auth, insumosController.editarInsumo)
    router.delete('/insumos/eliminar/:idInsumo', auth, insumosController.borrarInsumo)
    router.put('/insumos/editar-masivo', auth, insumosController.editarInsumosMasivamente);

    router.post('/proveedor', auth, proveedorController.nuevoProveedor)
    router.get('/proveedor', auth, proveedorController.mostrarProveedores)
    router.get('/proveedor/:idProveedor', auth, proveedorController.mostrarProveedor)
    router.put('/proveedor/editar/:idProveedor', auth, proveedorController.editarProveedor);
    router.delete('/proveedor/eliminar/:idProveedor', auth, proveedorController.borrarProveedor)

    router.post('/movimiento', auth, stockController.nuevoMovimiento);
    router.get('/movimiento', auth, stockController.mostrarFacturas)
    router.get('/movimiento/:idStock', auth, stockController.mostrarFactura)
    router.delete('/movimiento/eliminar/:idStock', auth, stockController.eliminarFactura)
    router.get('/stockactual', auth, stockController.stockActual)
    router.get('/ultimomovstock', auth, stockController.ultimoMovstock)



    //usuarios
    router.post('/crear-cuenta', usuariosController.registrarUsuario)
    router.post('/iniciar-sesion', usuariosController.iniciarSesion)
    // Ruta para enviar el correo de recuperación de contraseña
    router.post('/enviar-recuperacion-contrasena', usuariosController.enviarRecuperacionContrasena);

    // Ruta para restablecer la contraseña con el token proporcionado
    router.post('/restablecer-contrasena', usuariosController.restablecerContrasena);

    return router;
}