import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sequelize from "../db/conexion.js";
import userRouter from "../src/routes/user.route.js"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", userRouter);

async function iniciar() {
    try {
        await sequelize.authenticate();
        console.log("Conexion exitosa!!!");

        await sequelize.sync({force: false});
        console.log("Tablas sincronizadas");

        app.listen(PORT, ()=>{
        console.log(`servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

iniciar();