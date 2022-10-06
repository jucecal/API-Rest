const { Router } = require('express');
const controladorInicio = require('../controller/controladorInicio');
const ruta = Router();
ruta.get('/', controladorInicio.Inicio);

module.exports=ruta;