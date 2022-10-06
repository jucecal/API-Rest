const { Router } = require('express');
const controladorUsuarios = require('../controller/Usuario');
const ruta = Router();
ruta.get('/', controladorUsuarios.Inicio);
ruta.get('/listar', controladorUsuarios.Listar);
ruta.post('/guardar', controladorUsuarios.Guardar);
ruta.put('/editar', controladorUsuarios.Editar);
ruta.delete('/eliminar', controladorUsuarios.Eliminar);
module.exports=ruta;