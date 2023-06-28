const jwt = require ('jsonwebtoken');
const secret = '01otreipseD';
const { responseCreator } = require('../utils/utils');


async function jwtVerify(req,res,next){
    try {

        const token = req.headers.authorization;
        console.log(req.headers)
        console.log(token)
        if (!token) {
            return responseCreator(res, 401, 'No se proporcionó un token');
        }
        
        const payload = jwt.verify(token,secret)

        req.users = payload;

        next();

    } catch (error) {
        console.log(error)
        return responseCreator(res,401,'Error al Ingresar, token no valido')
    }

};

module.exports = jwtVerify