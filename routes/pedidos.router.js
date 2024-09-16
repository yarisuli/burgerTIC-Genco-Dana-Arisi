import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

router.get("/", PedidosController.getPedidos); 
router.get("/:id", PedidosController.getPedidoById);
router.get("/usuario/:id", PedidosController.getPedidosByUser);
router.post("/", verifyToken, PedidosController.createPedido); 
router.put("/:id/aceptar", verifyToken, verifyAdmin, PedidosController.aceptarPedido); 
router.put("/:id/comenzar", verifyToken, verifyAdmin, PedidosController.comenzarPedido);
router.put("/:id/entregar", verifyToken, verifyAdmin, PedidosController.entregarPedido); 
router.delete("/:id", verifyToken, verifyAdmin, PedidosController.deletePedido); 

export default router;
