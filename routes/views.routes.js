const express = require ("express");
const router = express.Router();
const viewsController = require('../controllers/views.controllers.js')


router.get('/', (req, res) => res.render('index'));
router.get('/index', (req, res) => res.render('index'));
router.get('/about-us', (req, res) => res.render('about-us'));
router.get('/admin-product', (req, res) => res.render('admin-product'));
router.get('/admin-user', (req, res) => res.render('admin-user'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/login', (req, res) => res.render('login'));
router.get('/order', (req, res) => res.render('order'));
router.get('/product-detail', (req, res) => res.render('product-detail'));
router.get('/register', (req, res) => res.render('register'));

module.exports = router;  