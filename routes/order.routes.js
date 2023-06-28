const express = require ("express");
const router = express.Router();

const orderController = require ('../controllers/order.controller')
const verifyOrderAndCalculate = require ('../middlewares/orderVerify')

// Subir una orden

router.post ('/order', orderController.createOrder);

// Obtener las ordenes

router.get ('/order', orderController.getOrders);

// Obtener una orden especifico

router.get ('/order/:id', orderController.getOrderById);

// Actualizar una ordenvich

router.put ('/order/:id', orderController.updateOrder)

// Eliminar una orden

router.delete ('/order/:id', orderController.deleteOrder);





module.exports = router;  