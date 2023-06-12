
const express = require('express');
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios'
        }

    // Conectar a base de datos


    // Middlewares
        this.middlewares();

    // Rutas de mi aplicacion
        this.routes();
    };

    async conectarDB() {
        await dbConnection()
    }

    middlewares() { 

    // CORS
        this.app.use(cors());

    // Lectura y parseo del body de la db
    this.app.use(express.json());

    // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        
        this.app.use(this.paths.auth, require('../routes/auth.js'))
        this.app.use( this.paths.categorias, require('../auth/categorias.js'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios.js'))
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port)        
        });
    }

}
module.exports = Server;