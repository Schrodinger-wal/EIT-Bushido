// sirve para arranque la app

const mongoose = require ('mongoose');
const app = require('./app');
require('dotenv').config();

//hacemos lo de abajo para que capte el puerto del hosting, si no es este el caso, se conecte al puerto x000
const port = process.env.PORT || 1400
const URL = process.env.MONGODB_URL;


//mongo db conecction
async function dbConnect() {
    mongoose.set('strictQuery', false);

    await mongoose.connect(URL)
    
    console.log(`\x1b[93m Conexión a la DB correcta!!! \x1b[37m`);
    app.listen(port, ()=> {
        console.log(`\x1b[95m Servidor express escuchando en el puerto ${port} \x1b[37m`)
    })
}

dbConnect().catch(error => console.error(`Error al conectar con la DB`, error));


