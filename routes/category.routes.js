const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller.js');


// Cargar una categoria

router.post("/category", categoryController.addCategory)

// Obtener todas las categorias

router.get("/category", categoryController.getCategorys)

// Eliminar una categoria

router.delete("/category", categoryController.deleteCategory)

module.exports = router
