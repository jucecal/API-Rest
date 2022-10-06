const Telefono = require('../model/Telefono');
const { validationResult } = require('express-validator');
const {request} = require('express');

exports.Inicio = (req, res) => {
    const moduloTelefono = {
        modulo: 'telefonos',
        descripcion: 'Gestiona las operaciones con el modelo de telefonos',
        rutas: [
            {
                ruta: '/api/telefonos/listar',
                descripcion: 'Listar los telefonos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/telefonos/guardar',
                descripcion: 'Guardar los datos de un producto',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/telefonos/editar',
                descripcion: 'Modifica los datos de un producto',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/telefonos/eliminar',
                descripcion: 'Elimina los datos de un producto',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloTelefono);
}
exports.Listar = async (req, res) => {
    const listarTelefono = await Telefono.findAll();
    res.json(listarTelefono);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre, telefono } = req.body;
        if (!nombre || !telefono) {
            res.json({ msj: 'Debe enviar los campos completos' });
        } else {
            await Telefono.create({
                nombre: nombre,
                telefono: telefono
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
    const { nombre, telefono } = req.body;
    if (!nombre  || !telefono || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarTelefono = await Telefono.findOne({ where: { id: id } });
        if (!buscarTelefono) {
            res.send('El id del telefono no existe');
        } else {
            buscarTelefono.nombre = nombre;
            buscarTelefono.telefono = telefono;
            await buscarTelefono.save()
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
        await Telefono.destroy({ where: { id: id } })
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