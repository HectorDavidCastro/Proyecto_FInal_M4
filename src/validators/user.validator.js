import { body, validationResult } from "express-validator";

export const validarCrearUsuario = [
    body("nombre")
    .notEmpty().withMessage("El Campo nombre no puede estar vacio")
    .isLength({min:2}).withMessage("El nombre debe tener 2 caracteres como minimo"),

    body("email")
    .notEmpty().withMessage("El Campo email no puede estar vacio")
    .isEmail.withMessage("Email invalido"),

    body("password")
    .notEmpty().withMessage("El Campo password no puede estar vacio")
    .isLength({min:5}).withMessage("La contraseña debe tener 5 caracteres como minimo"),

    body("rol")
    .optional()
    .isIn(["admin", "usuario"]).withMessage("Roles permitidos: admin o usuario")
];

export function manejarErroresValidacion(req, res, next){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: "Datos invalidos",
            detalles: errors.array()
        })
    }

    next();
}