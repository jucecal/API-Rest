const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Usuario = db.define(
    'Usuario',
    {
        login:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        correo:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        password:
        {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        fallidos:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },

        codigo:
        {
            type: DataTypes.STRING(6),
            allowNull: true,
            defaultValue: '0000'
        },

        estado:
        {
            type: DataTypes.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC'
        }
    },
    {
        tableName: 'usuarios',
    }
);
module.exports = Usuario;