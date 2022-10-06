const Proveedor = require('../model/Proveedor');
const { validationResult } = require('express-validator');
const {request} = require('express');

exports.Inicio = (req, res) => {
    const moduloProveedor = {
        modulo: 'proveedores',
        descripcion: 'Gestiona las operaciones con el modelo de proveedor',
        rutas: [
            {
                ruta: '/api/proveedores/listar',
                descripcion: 'Listar los proveedores',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedores/guardar',
                descripcion: 'Guardar los datos de un proveedores',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedores/editar',
                descripcion: 'Modifica los datos de un proveedores',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/proveedores/eliminar',
                descripcion: 'Elimina los datos de un proveedores',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloProveedor);
}
exports.Listar = async (req, res) => {
    const listarProveedor = await Proveedor.findAll();
    res.json(listarProveedor);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.body;
        if (!nombre ) {
            res.json({ msj: 'Debe enviar los campos completos' });
        } else {
            await Proveedor.create({
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
        var buscarProveedor = await Proveedor.findOne({ where: { id: id } });
        if (!buscarProveedor) {
            res.send('El id del proveedor no existe');
        } else {
            buscarProveedor.nombre = nombre
            await buscarProveedor.save()
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
        await Proveedor.destroy({ where: { id: id } })
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