const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Proveedor = db.define(
    'Proveedor',
    {      
        nombre:
        {
            type: DataTypes.STRING(45),
            unique: { arg: true, msg: 'No se permiten nombres duplicados en el proveedor' },
            validate: {
                len: [3, 50],
            },
            allowNull: false
        },

        descripcion:
        {
            type: DataTypes.TEXT,
            allowNull: true
        },

        activo:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },
    {
        tableName: 'proveedores',
    }
);
module.exports = Proveedor;