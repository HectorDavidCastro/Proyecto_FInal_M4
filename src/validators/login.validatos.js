import { body, validationResult } from "express-validator";

export const loginValidator = [
    body("password")
    .notEmpty().withMessage("El campo (password) es requerido"),

    body("email")
    .notEmpty().withMessage("El campo (email) es requerido"),

    (req, res, next)=>{
        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            });
        }
        next()
    }
]