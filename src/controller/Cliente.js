const Cliente = require('../model/Cliente');

exports.Inicio = (req, res) => {
    const moduloCliente = {
        modulo: 'clientes',
        descripcion: 'Gestiona las operaciones con el modelo de clientes',
        rutas: [
            {
                ruta: '/api/clientes/listar',
                descripcion: 'Listar los clientes',
                metodo: 'GET',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/clientes/guardar',
                descripcion: 'Guardar los datos de un cliente',
                metodo: 'POST',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/clientes/editar',
                descripcion: 'Modifica los datos de un cliente',
                metodo: 'PUT',
                parametros: 'Ninguno'
            },
            {
                ruta: '/api/clientes/eliminar',
                descripcion: 'Elimina los datos de un cliente',
                metodo: 'DELETE',
                parametros: 'Ninguno'
            }
        ]
    }
    res.json(moduloCliente);
}
exports.Listar = async (req, res) => {
    const listarCliente = await Cliente.findAll();
    res.json(listarCliente);
}

exports.Guardar = async (req, res) => {
    console.log(req);
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        await Cliente.create({
            nombre: nombre,
            apellido: apellido
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
    const { nombre, apellido} = req.body;
    if (!nombre || !apellido || !id) {
        res.json({ msj: 'Debe enviar los datos completos' });
    } else {
        var buscarCliente = await Cliente.findOne({ where: { id: id } });
        if (!buscarCliente) {
            res.send('El id del cliente no existe');
        } else {
            buscarCliente.nombre = nombre;
            buscarCliente.apellido = apellido;
            await buscarCliente.save()
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
        await Cliente.destroy({ where: { id: id } })
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