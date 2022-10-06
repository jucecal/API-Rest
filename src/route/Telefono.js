const { Router } = require('express');
const controladorTelefono = require('../controller/Telefono');
const {body, query} = require('express-validator');
const ruta = Router();
ruta.get('/', controladorTelefono.Inicio);
ruta.get('/listar', controladorTelefono.Listar);
ruta.post('/guardar', 
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
body('telefono').isNumeric().withMessage('Solo se aceptan valores numericos para el telefono'),
controladorTelefono.Guardar);
ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
body('telefono').isNumeric().withMessage('Solo se aceptan valores numericos para el telefono'),
controladorTelefono.Editar);
ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorTelefono.Eliminar);
module.exports=ruta;