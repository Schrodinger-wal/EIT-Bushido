const Order = require('../schemas/order.schema');


// Post order


async function createOrder (req, res) {
    try {
        const {
            customerName, products, totalPrice
        } = req.body
        
        const order = new Order({
            customerName,
            products,
            totalPrice,
        });

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Orden creada con exito :)',
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al crear la orden :(',
            error,
        });
    }
};


// Obtener todas las ordenes


const getOrders = async (req, res) => {
    try {
        const idUser = req.params.idUser; 
        const orders = await Order.find({userId: idUser})
        .populate('products.productId',{name:1,description:1,imageURL:1})

        res.status(200).json({
            success: true,
            message: 'Ordenes encontradas :DD',
            orders
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            sucess: false,
            message: 'No se pudieron obtener las ordenes :((',
            error
        })
    }
}


// Obtener una orden en especifico


const getOrderById = async (req, res) => {
    try {
        const ordenId = req.params.id;
        const order = await Order.findById(ordenId).populate('userId', {
            name: 1,
            email: 1
        }).populate('products.productId', {
            name:1,
            description: 1,
            imageURL: 1,
        });

        if (!order) {
            return res.status(404).json({
                sucess: false,
                message: 'Orden no encontrada :DD',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Orden encontrada :d',
            order,
        })
    } catch (error){
        console.error(error);
        res.status(500).json ({
            sucess: false,
            message: `Error al obtener la orden :(`,
            error
        });
    }
}


// Actualizar una orden


const updateOrder = async (req, res) => {
    try {
        const ordenId = req.params.id;
        const {
            customerName,
            products,
            totalPrice,
        } = req.body;

        const order = await Order. findByIdAndUpdate(
            ordenId,
            {customerName, products, totalPrice},
            {new: true},
        );
        
        if (!order) {
            return res.status(404).json({
                sucess: false,
                message: 'La orden no fue encontrada :(('
            });
        }

        res.status(200).json({
            success: true,
            message: 'Orden actualizada con exitoo :))',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la orden :/',
            error,
        });
    }
};


// Eliminar una orden


const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndDelete(orderId)

        if(!order) {
            return res.status(404).json({
                sucess: false,
                message: 'No se encontro la orden ://'
            });
        }
        res.status(200).json({
            sucess: true,
            message: 'Orden eliminada con exito :))'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            sucess: false,
            message: 'Error al eliminar la accion :((((',
            error
        });
    }
};


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};