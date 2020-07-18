import Server from './classes/server';

import cors from 'cors'

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

var mongoose = require('mongoose');
const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

// Cors
server.app.use(cors({origin:true,credentials:true}))

// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );


// Conectar DB
mongoose.connect(
    'mongodb+srv://cluster0-ghkom.mongodb.net',
    {
        user: 'admin-fotos-gram',
        pass: 'Vargas_2018',
        dbName: 'fotosgram',
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },
    (err:any) => {
        if (err) throw err;
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    });

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});