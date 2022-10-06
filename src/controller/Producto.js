const Producto = require('../model/Producto');
const { validationResult } = require('express-validator');
const {request} = require('express');

exports.Inicio = (req, res) => {
    const moduloProducto = {
        modulo: 'productos',
        descripcion: 'Gestiona las operaciones con el modelo de productos',
        rutas: [
            {
                ruta: '/api/productos/listar',
                descripcion: 'Listar los productos',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/productos/guardar',
                descripcion: 'Guardar los datos de un producto',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/productos/editar',
                descripcion: 'Modifica los datos de un producto',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/productos/eliminar',
                descripcion: 'Elimina los datos de un producto',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloProducto);
}
exports.Listar = async (req, res) => {
    const listarProducto = await Producto.findAll();
    res.json(listarProducto);
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre, precio } = req.body;
        if (!nombre || !precio) {
            res.json({ msj: 'Debe enviar los campos completos' });
        } else {
            await Producto.create({
                nombre: nombre,
                precio: precio
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
    const { nombre, precio } = req.body;
    if (!nombre  || !precio || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarProducto = await Producto.findOne({ where: { id: id } });
        if (!buscarProducto) {
            res.send('El id del producto no existe');
        } else {
            buscarProducto.nombre = nombre;
            buscarProducto.precio = precio;
            await buscarProducto.save()
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
        await Producto.destroy({ where: { id: id } })
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