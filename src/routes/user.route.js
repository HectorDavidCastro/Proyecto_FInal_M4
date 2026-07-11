import { Router } from "express";
import { manejarErroresValidacion, validarCrearUsuario } from "../validators/user.validator.js";
import * as userController from "../controllers/user.controller.js"
import { verificarToken } from "../middlewares/validarToken.js";
import { loginValidator } from "../validators/login.validatos.js";
import { updateValidator } from "../validators/update.validator.js";
import { deleteValidator } from "../validators/delete.validator.js";

const router = Router();

router.post("/crear", validarCrearUsuario, manejarErroresValidacion, userController.crear);
router.post("/login", loginValidator, userController.login);
router.post("/actualizar", updateValidator, userController.actualizar);
router.post("/eliminar", deleteValidator, userController.eliminar);
router.get("/perfil", verificarToken, userController.verPerfil);

export default router