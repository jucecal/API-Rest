const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Tipo = db.define(
    'Tipo',
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        nombre:
        {
            type: DataTypes.STRING(50), allowNull: false, 
            unique: { arg: true, msg: 'No se permiten nombres duplicados en el tipo' },
            validate: {
                len: [3, 50]
            }
        },

        imagen:
        {
            type: DataTypes.STRING(250),
            allowNull: true
        },

        activo:
        {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        tableName: 'tipos',
    }
);
module.exports = Tipo;