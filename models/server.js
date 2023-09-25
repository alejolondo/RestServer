const express = require('express')
const cors = require('cors');
const router = require('../routes/user');
const {dbConnection} = require('../database/config')



class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de mi aplicación 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio public
        this.app.use(express.static('public'));
    }

    routes(){
       this.app.use('/api/usuarios', router);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;