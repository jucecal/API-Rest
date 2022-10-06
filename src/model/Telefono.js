const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Telefono = db.define(
    'Telefono',
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

        telefono:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        tableName: 'telefonos',
    }
);
module.exports = Telefono;