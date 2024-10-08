import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
            LISTO!!
    */

    try {
        const pedidos = await PedidosService.getPedidos();
        return res.status(200).json(pedidos);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message });
    }
};

const getPedidosByUser = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
            LISTO!!
        
    */

    try {
        const pedidosUsuario = await PedidosService.getPedidosByUser(req.id);
        
        return res.status(200).json(pedidosUsuario);

    } catch (error){
        console.error(error);

        res.status(500).json({ message: error.message });

    }
};

const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */

    const id = parseInt(req.params.id); 

    try {
        const pedidoId = await PedidosService.getPedidoById(id);

        if(!pedidoId)
            return res.status(404).json({message: "El pedido no existe."});

        return res.status(200).json({pedidoId});

    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */

    const platos = req.body.platos;

    if(!platos) 
        return res.status(400).json({ message: "Se necesita el campo platos." });

    if (!Array.isArray(platos))
        return res.status(400).json({message: "El campo debe ser un array."});

    if (platos.length < 1)
        return res.status(400).json({message: "El pedido debe tener al menos un plato."});

    for (const plato of platos) {
        if (!plato.id || !plato.cantidad)
            return res.status(400).json({ message: "Cada producto debe tener un id y una cantidad."});
    }

    try{

        const pedido = await PedidosService.createPedido(req.id, platos);
        res.status(201).json({message: "Pedido creado existosamente."});

    }catch (error){ 
        res.status(500).json({ message: error.message });
    }

};

const aceptarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */

    const id = parseInt(req.params.id); 

    const pedidoAceptar = await PedidosService.getPedidoById(id);
        
    if(!pedidoAceptar || pedidoAceptar.length === 0)
        return res.status(404).json({message: "El pedido no existe."});

    const pedido = pedidoAceptar[0];

    try {

        if (pedido.estado !== "pendiente")
            return res.status(400).json({message: "El pedido no esta en estado pendiente."});

        const acualizar = await PedidosService.updatePedido(pedido.id, "aceptado");

        res.status(200).json({message: "Se aceptó el pedido."});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const comenzarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */

            const id = parseInt(req.params.id); 

            const pedidoComenzar = await PedidosService.getPedidoById(id);
                
            if(!pedidoComenzar || pedidoComenzar.length === 0)
                return res.status(404).json({message: "El pedido no existe."});
        
            const pedido = pedidoComenzar[0];
        
            try {
        
                if (pedido.estado !== "aceptado")
                    return res.status(400).json({message: "El pedido no fué aceptado todavía."});
        
                const enCamino = await PedidosService.updatePedido(pedido.id, "en camino");
        
                res.status(200).json({message: "El pedido está en camino."});
        
            } catch (error) {
                res.status(500).json({ message: error.message });
            }


};

const entregarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
    
            const id = parseInt(req.params.id); 

            const pedidoEntregar = await PedidosService.getPedidoById(id);
                
            if(!pedidoEntregar || pedidoEntregar.length === 0)
                return res.status(404).json({message: "El pedido no existe."});
        
            const pedido = pedidoEntregar[0];
        
            try {
        
                if (pedido.estado !== "en camino")
                    return res.status(400).json({message: "El pedido no está en camino."});
        
                const acualizar = await PedidosService.updatePedido(pedido.id, "entregado");
        
                res.status(200).json({message: "Se entregó el pedido."});
        
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
};

const deletePedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
    
    const id = parseInt(req.params.id); 

    const pedido = await PedidosService.getPedidoById(id);

    if(!pedido)
        return res.status(404).json({message: "El pedido no existe."})

    try {
        const eliminar = await PedidosService.deletePedido(id);
        res.status(200).json({message: "El pedido se eliminó correctamente."});

    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
