import jwt from "jsonwebtoken";
import "dotenv/config"

const CLAVE = process.env.JWT_SECRET;

export const verificarToken = (req, res, next)=>{
    const authHeader= req.headers['authorization'];
    if(!authHeader){
        return res.status(400).json({
            message: "Header no proporcionado"
        });
    };

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: "Token invalido"
        });
    }

    try {
        
        const payload = jwt.verify(token, CLAVE);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(418).json({
            message: "Token invalido o expirado"
        });
    }
} 