const { validationResult } = require('express-validator');
const Usuario = require('../model/Usuario');
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');
const EnviarCorreo = require('../config/correo');
const gpc = require('generate-pincode');

function validacion(req) {
    var errores
    var validaciones = validationResult(req);
    var error = {
        mensaje: '',
        parametro: '',
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
    }
    return errores;
};

exports.Pin = async (req, res) => {
    var errores = validacion(req);
    console.log(errores);
    if (errores) {
        msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
    }
    else {
        const { correo } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        if (!buscarUsuario) {
            errores = [
                {
                    mensaje: "El correo no exite o no esta vinculado con ningun usuario",
                    parametro: "correo"
                },
            ];
            msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            const pin = gpc(4);
            const data = {
                correo: correo,
                pin: pin
            };
            console.log(pin);
            if (await EnviarCorreo.EnviarCorreo(data)) {
                buscarUsuario.codigo = pin;
                await buscarUsuario.save();
                msjRes("Peticion ejecutada correctamente", 200, { msj: 'Correo Enviado' }, errores, res);
            }
            else {
                errores = [
                    {
                        mensaje: "Error al enviar el correo",
                        parametro: "correo"
                    }
                ];
                msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
            }

        }
    }
};


exports.Recuperar = async (req, res) => {
    var msj = validacion(req);
    console.log(msj);
    if (msj.length > 0) {
        msjRes("Peticion ejecutada correctamente", 200, [], msj, res);
    }
    else {
        const busuario = req.query.usuario;
        const { pin, contrasena } = req.body;
        var buscarUsuario = await Usuario.findOne({
            where: {
                [Op.or]: {
                    correo: busuario,
                    login: busuario
                },
            }
        });
        console.log(buscarUsuario);
        if (!buscarUsuario) {
            var errores = [
                {
                    mensaje: "El correo o login no exite",
                    parametro: "usuario"
                },
            ];
            msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else {
            if (pin != buscarUsuario.codigo) {
                var errores = [
                    {
                        mensaje: "El pin es incorrecto o ha expirado",
                        parametro: "pin"
                    },
                ];
                msjRes("Peticion ejecutada correctamente", 200, [], errores, res);
            }
            else {
                //const hash = bcrypt.hashSync(contrasena, 10);
                buscarUsuario.contrasena = contrasena;
                buscarUsuario.estado = 'AC';
                buscarUsuario.fallidos = 0;
                buscarUsuario.codigo = '0000';
                await buscarUsuario.save()
                    .then((data) => {
                        console.log(data);
                        msjRes("Peticion ejecutada correctamente", 200, data, [], res);
                    })
                    .catch((error) => {
                        msjRes("Peticion ejecutada correctamente", 200, [], error, res);
                    });
            }
        }
    }
};

