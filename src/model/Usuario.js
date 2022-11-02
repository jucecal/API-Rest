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

        contrasena:
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
        hooks: {
            beforeCreate(usuario) {
                const hash = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena = hash;
            },
            beforeUpdate(usuario) {
                if (usuario.contrasena) {
                    const hash = bcrypt.hashSync(usuario.contrasena, 10);
                    usuario.contrasena = hash;
                }
                if (usuario.fallido >= 5)
                    usuario.estado = 'BL';
            },
        }

    }
);

Usuario.prototype.VerificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};

module.exports = Usuario;