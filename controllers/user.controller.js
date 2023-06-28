const User = require("../schemas/user.schema");
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');


const saltRounds = 10;




    // Crear un usuario


async function createUser(req, res) {
    try {
        const user = new User(req.body);
        const passHash = await bcrypt.hash(user.password, saltRounds);
        console.log('Hash de contraeña', passHash)
        user.password = passHash;
        const newUser = await user.save();
        return res.status(200).json({
            msg: 'Usuario creado :)',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('El usuario no se guardo :(')
        
    }
}


// Obtener todos los usuarios


async function getUsers(req, res) {
    try {
        const users = await User.find({
            email : {$ne: 'admin@admin.com'}
        });
        console.log('Usuarios obtenidos', users)
        if(!users.length) {
            return res.status(404).json({
                msg: 'No se encontraron usuarios'
            });
        }
        return res.status(200).json({
            msg: 'Usuario obtenido :DD',
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error al obtener usuarios')
    }
}


// Obtener un usuario específico


async function getUserById(req, res) {
    const id = req.params.id;

    if (req.user.role === 'ADMIN_ROLE' && req.user._id !== id) {
        return res.status(400).json({
            msg: 'No posee los permisos requeridos ;)'
        });
    }

    try {
        const user = await User.findById(id, { password: 0});
        console.log('Usuario actualizado', user)
        if (!user) {
            return res.status(404).json({ 
                msg: 'No se encontro el usuario :/'
            })
        }

        return res.status(200).json({
            msg: 'Usuario encontrado con exito ;)',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send('No se encontro el usuario :(')
        
    }
}


// Actualizar un usuario


async function updateUser(req, res) {
    try {
        const id = req.params.id;

    if (req.user.role !== 'ADMIN_ROLE' && id !== req.user._id) {
        return res.status(401).json({
            msg: 'No tiene los permisos necesarios :/' });
    }
        const data = req.body;
        data.password = undefined;
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
        console.log('Usuario actualizado:', updatedUser);

    if (!updatedUser) {
        return res.status(404).json({ 
            msg: 'No se encontró el usuario' });
        }
            return res.status(200).json({ 
                msg: 'Usuario actualizado!!!', 
                user: updatedUser });
        } catch (error) {
        console.log(error);
        return res.status(500).send('Error al actualizar el usuario!!');
        }
    }



// Eliminar un usuario



async function deleteUser(req, res) {
        try {
            const id = req.params.id;
            const deletedUser = await User.findByIdAndDelete(id);
            
        if (!deletedUser) {
            return res.status(404).json({ 
                msg: 'El usuario no pudo ser eliminado :&'});
            }
            
            return res.status(200).json({ 
                msg: 'Usuario eliminado correctamente :D', 
                deletedUser });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al eliminar el usuario');
        }
    }



// Login

async function login(req, res) {
    try {
        const emailLogin = req.body.email;
        const passwordLogin = req.body.password;

    if (!emailLogin || !passwordLogin) {
        return res.status(400).send({
            msg: 'Datos incompletos :3'
        });
    }

    const user = await User.findOne({
        email: emailLogin
    });

    if (!user) {
        return res.status(404).send({
            msg: 'Datos ingresados incorrectos'
        });
    }
    let secret = process.env.JWT_SECRET;

    const result = await bcrypt.compare(passwordLogin, user.password);
    console.log('Resultado de la comparación de contraseñas:', result);
    if (!result) {
        return res.status(404).send({
            msg: 'Datos ingresados incorrectos'
        })
    }
    user.password = undefined;



    //con jwt se puede ver el token 
    const token = jwt.sign(JSON.stringify(user), secret);
    console.log('Token generado :D', token);

    return res.status(200).send({
        msg: 'Datos ingresados correctos!!! :DDD',
        user, 
        token,
    })
    }catch (error) { 
        console.error(error);
        return res.status(500).send('Error login :/')
    }
}


    // Update password

async function updatePassword(req, res) {
    try {
        const id = req.params.id;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado :/' });
    }

    const pwdCompare = await bcrypt.compare(oldPassword, user.password);

    if (!pwdCompare) {
        return res.status(401).json({ 
            msg: 'No se pudo modificar la contraseña :/' });
    }
        
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.findByIdAndUpdate(id, { password: newHashedPassword });

        return res.status(200).json({ 
            msg: 'Contraseña actualizada!! owo' });

    }catch (error) {
        console.log(error);
        return res.status(500).send('error de actualizacion de password');
}
}


    
    module.exports = {
        createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
        login,
        updatePassword,
    };
