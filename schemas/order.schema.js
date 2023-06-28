const { SchemaType } = require('mongoose');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product', 
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: 1,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            }
            ],
    required : true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum:  [ 'Procesado', 'En progreso', 'Listo'],
        default: 'Procesado'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    customerName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('order', orderSchema);