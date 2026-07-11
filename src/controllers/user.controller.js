import * as userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function crear(req, res) {
    try {
        const existe = await userService.encontrarPorEmail(req.body.email);

        if(existe){
            return res.status(409).json({error:"Email ya registrado"})
        }

        const newUser = await userService.crear(req.body);

        res.status(201).json({mensaje: "Usuario creado!!!", usuario: newUser})
    } catch (err) {
        res.status(500).json({error: "Error al crear usuario"})
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    const usuarioEncontrado = await userService.encontrarPorEmail(req.body.email);
    if(!usuarioEncontrado){
        return res.status(401).json({
            error: "Usuario no encontrado"
        });
    }

    const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);
    if(!passwordValida){
        return res.status(418).json({
            message: "Constaseña invalida"
        });
    };

        const token = jwt.sign({
        id: usuarioEncontrado.id,
        email: usuarioEncontrado.email
    },CLAVE,{expiresIn: "2h"});
    
    res.status(200).json({
        message:"login exitoso!!!",
        token: token
    });



}