const Tipo = require('../model/Tipo');
const { validationResult } = require('express-validator');
const { request } = require('express');
const MSJ = require('../componentes/mensaje');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
var errores = [];
var data = [];
var error = {
    msg: '',
    parametro: ''
};


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

exports.buscarId = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { id } = req.query;
        const listarTipos = await Tipo.findAll({
            where: {
                id
            }
        });
        res.json(listarTipos);
    }
}

exports.buscarNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.errors);
        res.json({ msj: 'Errores en los datos enviados' });
    } else {
        const { nombre } = req.query;
        const listarTipos = await Tipo.findAll({
            attributes: [['nombre', 'Nombre tipo'], 'imagen'],
            where: {
                [Op.and]: {
                    nombre: {
                        [Op.like]: nombre
                    },
                    activo: true
                }
            }
        });
        res.json(listarTipos);
    }
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

exports.RecibirImagen = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    //console.log(req);
    console.log(filename);
    try {
        errores = [];
        data = [];
        var buscarTipo = await Tipo.findOne({ where: { id } });
        if (!buscarTipo) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/Tipos/' + filename));
            if (!buscarImagen)
                console.log('La imagen no existe');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/Tipos/' + filename));
                console.log('Imagen eliminada');
            }
            error.msg = 'El id del tipo no existe. Se elimino la imagen enviada';
            error.parametro = 'id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        } else {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/tipos/' + buscarTipo.imagen));
            if (!buscarImagen)
                console.log('No encontro la imagen');
            else {
                fs.unlinkSync(path.join(__dirname, '../public/img/tipos/' + buscarTipo.imagen));
                console.log('Imagen eliminada');
            }
            buscarTipo.imagen = filename;
            await buscarTipo.save()
                .then((data) => {
                    MSJ('Peticion ejecutada correctamente', 200, data, errores, res);
                })
                .catch((error) => {
                    errores.push(error);
                    MSJ('Peticion ejecutada correctamente', 200, [], errores, res);
                });
        }
    } catch (error) {
        console.log(error);
        errores.push(error);
        MSJ('Error al ejecutar la peticion', 500, [], errores, res);
    }
}

