import { DataTypes } from "sequelize";
import sequelize from "../../db/conexion.js";

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        rol: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "Usuario"
        }
    },
        {
        tableName: 'user',
        timestamps:true,
        createdAt: "creado_en",
        updatedAt: "actualizado_en"
    },
);

export default User