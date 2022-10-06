const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Cliente = db.define(
    'Cliente',
    {
        nombre:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        apellido:
        {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        telefono:
        {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        direccion:
        {
            type: DataTypes.TEXT,
            allowNull: true
        },

        imagen:
        {
            type: DataTypes.STRING(250),
            allowNull: true
        },
    },
    {
        tableName: 'clientes',
    }
);
module.exports = Cliente;