import { Router } from "express";
import { manejarErroresValidacion, validarCrearUsuario } from "../validators/user.validator.js";
import * as userController from "../controllers/user.controller.js"
import { verificarToken } from "../middlewares/validarToken.js";
import { loginValidator } from "../validators/login.validatos.js";

const router = Router();

router.post("/crear", validarCrearUsuario, manejarErroresValidacion, userController.crear);
router.post("/login", loginValidator, userController.login);

export default router