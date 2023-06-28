const express = require ('express');
const router = express.Router();

const productController = require ("../controllers/product.controller");
const uploadController = require ("../controllers/upload.controller");


// Subir un producto

router.post ('/products', uploadController.uploadProduct, productController.addProduct);

// Obtener los productos

router.get ('/products', productController.getProduct);

// Obtener un producto especifico

router.get ('/products/:id', productController.getProductById);

// Actualizar un productovich

router.put ('/products/:id', uploadController.uploadProduct, productController.updateProduct);

// Eliminar un producto

router.delete ('/products/:id', productController.deleteProduct);





module.exports = router;  