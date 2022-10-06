const Usuario = require('../model/Usuario');

exports.Inicio = (req, res) => {
    const moduloUsuario = {
        modulo: 'usuarios',
        descripcion: 'Gestiona las operaciones con el modelo de usuarios',
        rutas: [
            {
                ruta: '/api/usuarios/listar',
                descripcion: 'Listar los usuarios',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/usuarios/guardar',
                descripcion: 'Guardar los datos de un usuario',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/usuarios/editar',
                descripcion: 'Modifica los datos de un usuario',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/usuarios/eliminar',
                descripcion: 'Elimina los datos de un usuario',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloUsuario);
}
exports.Listar = async (req, res) => {
    const listarUsuario = await Usuario.findAll();
    res.json(listarUsuario);
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { login, correo, password } = req.body;
    if (!login || !correo || !password) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Usuario.create({
            login: login,
            correo: correo,
            password: password
        }).then(data => {
            res.json({ msj: 'Registro guardado' });
        })
            .catch((er) => {
                res.json({ msj: 'Error al guardar el registro' });
            })
    }
}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { login, correo, password } = req.body;
    if (!login || !correo || !password || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarUsuario = await Usuario.findOne({ where: { id: id } });
        if (!buscarUsuario) {
            res.send('El id del usuario no existe');
        } else {
            buscarUsuario.login = login;
            buscarUsuario.correo = correo;
            buscarUsuario.password = password;
            await buscarUsuario.save()
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
        await Usuario.destroy({ where: { id: id } })
            .then((data) => {
                if(data==0){
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