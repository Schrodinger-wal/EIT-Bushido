// importamos el modelo
const product = require('../schemas/product.schema');
const { findByIdAndUpdate } = require('../schemas/user.schema');

// Post product

async function addProduct (req, res) {
    console.log('products')
    console.log(req.file);
    console.log(req.image);
    try {
        const newProduct = new product(req.body);
        newProduct.image = req.body.image;
        await newProduct.save();

        return res.status(200).send ({
            ok: true,
            msg: `El producto ha sido agregado :DDD`,
            newProduct
        })
    }
    catch (error) {
        return res.status(400).send({
            ok: false,
            msg: `No se ha agregado el producto :/`,
            error
        })
    }
}

// Obetener los productos

async function getProduct (req, res) {
    console.log('la call')
    const limit = 40

    const itemsToSkip = limit * (req.query.skip - 1)
    const productos = await product.find().limit(limit).skip(itemsToSkip)
    

    const total = await product.countDocuments();
    
    try {
        const Products = await product.find({});
        return res.status(200).send({
            ok:true,
            msg: `Productos obtenidos correctamente :DD`,
            Products,
            productos,
            total
        })
    }
    catch (error) {
        return res.status(200),send({
            ok: false,
            msg: `Error al obtener los productos :(`,
            error,
        })
    }
}


// Obtener un producto

async function getProductById (req, res) {
    try {
        const newProduct = await product.findById(req.params.id);

            return res.status(200).send({
                msg: `Producto encontrado :))`,
                ok: true,
                newProduct,
            });
    }
    catch (error){
        res.status(400).send({
            msg: `Producto no encontrado :/`,
            ok: false,
        })
    }
}



// Borrar un producto

async function deleteProduct (req, res) {
    const id = req.params.id;

    product.findByIdAndDelete(id).then((deleted) => {
        if (!deleted) {
            return res.status(404).send({
                msg: 'No se encontró el producto a borrar :(',
                ok: false
            });
        } else {
            return res.status(200).send({
                msg: 'El producto fue borrado exitosamente :D',
                ok: true
            });
        }
    })
    .catch(error => {
        console.error(error);
        return res.status(400).send('No se pudo borrar el producto :(')
    }) 
}


// Actualizar un producto

async function updateProduct (req, res) {
    try {
        const id = req.query.id;
        const data = req.body;

        const newProduct = await product.findByIdAndUpdate(id, data, {new: true})

        if(!newProduct) {
            return res.status(404).send({
                msg:'El producto no pudo ser actualizado :('
            })
        } return res.status(200).send({
            msg: 'El producto fue actualizado con mucho exito :))',
            newProduct: newProduct
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: 'No pudo ser actualizado :('
        })
    }
}



// exportamos uwu

module.exports = {
    addProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
}