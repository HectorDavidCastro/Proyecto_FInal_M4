import bcrypt from "bcrypt";
import User from "../models/User.js";

const users = await User.findAll();

export async function crear(data) {
    const{nombre, email, password, rol} = data;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
        nombre: nombre,
        email: email,
        password: hashPassword,
        rol: rol
    });

    const {password:_, ...newUser} =newUser.toJSON();
    return newUser
}

export const encontrarPorEmail=async (email) => {
    const user = await User.findOne({where: {email:email}});
    return user
}
