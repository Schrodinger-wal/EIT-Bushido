const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
        validator: function(value) {
            // Expresión regular mejorada para validar correo electrónico
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value);
        },
            message: props => `${props.value} no es un correo electrónico válido`
        }
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: [ 'ADMIN_ROLE', 'USER_ROLE'],
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 12,
        max: 110,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('user', userSchema)