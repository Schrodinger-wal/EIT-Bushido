const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
    }
})



// despues mongo me lo plurariza
module.exports = mongoose.model('Category', CategorySchema);