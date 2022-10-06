const Tipo = require('../model/Tipo');
const { validationResult } = require('express-validator');
const {request} = require('express');

exports.Inicio = (req, res) => {
    const moduloTipo = {
        modulo: 'tipos',
        descripcion: 'Gestiona las operaciones con el modelo de tipos',
        rutas: [
            {
                ruta: '/api/tipos/listar',
                descripcion: 'Listar los tipos de productos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/tipos/guardar',
                descripcion: 'Guardar los datos de un tipo de producto',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/tipos/editar',
                descripcion: 'Modifica los datos de un tipo de producto',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/tipos/eliminar',
                descripcion: 'Elimina los datos de un tipo de producto',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloTipo);
}
exports.Listar = async (req, res) => {
    const listarTipos = await Tipo.findAll();
    res.json(listarTipos);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.body;
        console.log(nombre);
        if (!nombre) {
            res.json({ msj: 'Debe enviar el nombre del tipo' });
        } else {
            await Tipo.create({
                nombre: nombre
            }).then(data => {
                res.json({ msj: 'Registro guardado' });
            })
                .catch((er) => {
                    var errores = '';
                    er.errors.forEach(element => {
                        console.log(element.message);
                        errores += element.message + '. ';
                    })
                    res.json({ errores });
                })
        }
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { nombre } = req.body;
    if (!nombre || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarTipo = await Tipo.findOne({ where: { id: id } });
        if (!buscarTipo) {
            res.send('El id del tipo no existe');
        } else {
            buscarTipo.nombre = nombre;
            await buscarTipo.save()
                .then((data) => {
                    console.log(data);
                    res.send('Actualizado correctamente');
                })
                .catch((er) => {
                    console.log(er);
                    res.send('Error al actualizar');
                });
        }
    }
}

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ msj: 'Debe enviar el id' });
    } else {
        await Tipo.destroy({ where: { id: id } })
            .then((data) => {
                if (data == 0) {
                    res.send('El id no existe');
                } else {
                    res.send('Registros eliminados: ' + data);
                }
            })
            .catch((er) => {
                console.log(er);
                res.send('Error al eliminar');
            })
    }
}