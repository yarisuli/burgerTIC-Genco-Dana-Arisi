import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
router.post("/", AuthController.register);
router.get("/:id", AuthController.login);

export default router;
