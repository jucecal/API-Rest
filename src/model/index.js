const Tipo = require('./Tipo');
const Usuario = require('./Usuario');
const Cliente = require('./Cliente');
const Producto = require('./Producto');
const Proveedor = require('./Proveedor');
const Telefono = require('./Telefono');

exports.CrearModelos = () => {

    Cliente.hasMany(Usuario);
    Usuario.belongsTo(Cliente);

    Tipo.hasMany(Producto);
    Producto.belongsTo(Tipo);

    Proveedor.hasMany(Telefono);
    Telefono.belongsTo(Proveedor);

    Tipo.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Producto.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })
    
    Cliente.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })
    
    Usuario.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })
    
    Proveedor.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })

    Telefono.sync().then(()=>{
        console.log('Modelo creado correctamente');
    })
    .catch((error) => {
        console.log('Error al crear el modelo');
        console.log(error);
    })
}