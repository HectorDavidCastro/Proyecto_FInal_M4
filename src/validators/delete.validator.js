import { body, validationResult } from "express-validator";

export const deleteValidator = [
    body("id")
    .notEmpty().withMessage("El campo (id) es requerido"),

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