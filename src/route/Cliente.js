const { Router } = require('express');
const controladorClientes = require('../controller/Cliente');
const ruta = Router();
ruta.get('/', controladorClientes.Inicio);
ruta.get('/listar', controladorClientes.Listar);
ruta.post('/guardar', controladorClientes.Guardar);
ruta.put('/editar', controladorClientes.Editar);
ruta.delete('/eliminar', controladorClientes.Eliminar);
module.exports=ruta;