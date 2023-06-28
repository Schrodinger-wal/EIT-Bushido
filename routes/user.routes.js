const express = require ("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwtVerify');
const isAdmin = require('../middlewares/isAdmin')

// Crear un usuario
router.post ('/users'/* ,[jwtVerify, isAdmin] */, userController.createUser);

// Obtener todos los usuarios
router.get('/users', /* [jwtVerify, isAdmin] */userController.getUsers);

// Obtener un usuario especifico
router.get('/users/:id', userController.getUserById);

// Actualizar un usuario 
router.put('/users/:id', userController.updateUser);

// Eliminar un usuario
router.delete('/users/:id'/* , [jwtVerify, isAdmin] */,userController.deleteUser);

// Editar un usuario
router.put("/users/:id", userController.updateUser)

//Actualizar Password
router.put("/users/:id/password"/* ,jwtVerify */,userController.updatePassword);

//login
router.post("/login",userController.login);

module.exports = router;  