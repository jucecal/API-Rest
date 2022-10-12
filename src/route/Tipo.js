const { Router } = require('express');
const controladorTipos = require('../controller/Tipo');
const {body, query} = require('express-validator');
const ruta = Router();
ruta.get('/', controladorTipos.Inicio);
ruta.get('/listar', controladorTipos.Listar);
ruta.get('/buscarId', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorTipos.buscarId);
ruta.get('/buscarnombre', 
query('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
controladorTipos.buscarNombre);
ruta.post('/guardar', 
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
controladorTipos.Guardar);
ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del tipo con una longitud de 3 - 50 caracteres'),
controladorTipos.Editar);
ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorTipos.Eliminar);
module.exports=ruta;