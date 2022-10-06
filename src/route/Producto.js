const { Router } = require('express');
const controladorProductos = require('../controller/Producto');
const {body, query} = require('express-validator');
const ruta = Router();
ruta.get('/', controladorProductos.Inicio);
ruta.get('/listar', controladorProductos.Listar);
ruta.post('/guardar', 
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
body('precio').isNumeric().withMessage('Solo se aceptan valores numericos para el precio'),
controladorProductos.Guardar);
ruta.put('/editar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
body('nombre').isLength({min: 3, max: 50}).withMessage('Debe escribir el nombre del producto con una longitud de 3 - 50 caracteres'),
body('precio').isNumeric().withMessage('Solo se aceptan valores numericos mayores a 0 para el precio'),
controladorProductos.Editar);
ruta.delete('/eliminar', 
query('id').isInt().withMessage('Solo se aceptan valores enteros para el id'),
controladorProductos.Eliminar);
module.exports=ruta;