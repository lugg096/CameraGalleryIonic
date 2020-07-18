"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
var mongoose = require('mongoose');
var cors = require('cors');
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));

// Cors
server.app.use(cors({origin:true,credentials:true}))

// Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
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
    (err) => {
        if (err) throw err;
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    });



// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
