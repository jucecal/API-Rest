const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const controladorTipos = require('../controller/Tipo');
const { body, query } = require('express-validator');
const storageTipos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/tipos'));
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/', '.'));
    }
});
const uploadTipos = multer({ storage: storageTipos });
const ruta = Router();
ruta.get('/', controladorTipos.Inicio);
ruta.get('/listar', controladorTipos.Listar);
ruta.get('/buscarId',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorTipos.buscarId);
ruta.get('/buscarnombre',
    query('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorTipos.buscarNombre);
ruta.post('/guardar',
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorTipos.Guardar);
ruta.put('/editar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    body('nombre').isLength({ min: 3, max: 50 }).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
    controladorTipos.Editar);
ruta.delete('/eliminar',
    query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
    controladorTipos.Eliminar);
ruta.post('/imagen',
    uploadTipos.single('img'),
    controladorTipos.RecibirImagen);
module.exports = ruta;