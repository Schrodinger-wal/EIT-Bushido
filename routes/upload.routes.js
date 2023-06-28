const express = require ("express");
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// cargar imagen al producto

router.post('/products/upload/image', uploadController.uploadProduct);














module.exports = router;  