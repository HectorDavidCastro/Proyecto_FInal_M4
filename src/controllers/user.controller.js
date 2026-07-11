import * as userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config"

const CLAVE = process.env.JWT_SECRET;

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



};

export async function actualizar(req, res) {
    const { id, nuevoNombre } = req.body;


    const usuarioActualizado = await User.update({nombre: nuevoNombre}, {where:{id:id}});
    if(usuarioActualizado.includes(0)){
        return res.status(401).json({
            error: `no se encontro el usuario con el ID:${id}`
        });
    }

    res.status(200).json({
        mensaje: "Usuario actualizado exitosamente!!!",
        usuario: usuarioActualizado
    });

}

export async function eliminar(req, res) {
    const { id } = req.body;

    const resultado = await User.destroy({where:{id:id}});
    if(!resultado){
        return res.status(401).json({
            mensaje: `No se encontro el registro con el ID:${id}`
        });
    }

    res.status(200).json({
        mensaje:`Se elimino el registro con el ID:${id}`
    })
}

export async function verPerfil(req, res) {
    const user = User.findOne({where:{id:req.user.id}});

    if(!user){
        return res.status(401).json({
            error: "Usuario no encontrado"
        });
    }

    res.status(200).json({
        usuario: req.user
    });
}