const { file } = require('googleapis/build/src/apis/file');
const moongose = require ('mongoose');
const Schema = moongose.Schema;

const productSchema = new Schema({
    name: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum:  [ 'Stock', 'Sin stock'],
        default: 'Stock',
        required: false,
    },
    category: {
        type: moongose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    createdAt: {type: Number, default: Date.now},
})

module.exports = moongose.model('product', productSchema)