const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Producto = db.define(
    'Producto',
    {      
        nombre:
        {
            type: DataTypes.STRING(45),
            unique: { arg: true, msg: 'No se permiten nombres duplicados en el producto' },
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

        precio:
        {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        estado:
        {
            type: DataTypes.TINYINT,
            allowNull: true
        },

        categoria:
        {
            type: DataTypes.ENUM('GE', 'IN', 'PR', 'EL'),
            allowNull: true,
            defaultValue: 'GE'
        },

        imagen:
        {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
    },
    {
        tableName: 'productos',
    }
);
module.exports = Producto;