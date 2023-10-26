import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import cors from "cors"

import ArtesaosControllers from './src/controllers/ArtesaosControllers.js'
import EnderecoControllers from './src/controllers/EnderecoControllers.js'
import ProdutoControllers from './src/controllers/ProdutoControllers.js'
import UnidadesControllers from './src/controllers/UnidadesControllers.js'
import UsuariosControllers from './src/controllers/UsuariosControllers.js'

config()

const app = express();

app.use(express.json())
app.use(cors({
  //origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });
})
.catch((e)=>console.log(e.message))

ArtesaosControllers.rotas(app)
EnderecoControllers.rotas(app)
ProdutoControllers.rotas(app)
UnidadesControllers.rotas(app)
UsuariosControllers.rotas(app)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seu_banco_de_dados', { useNewUrlParser: true, useUnifiedTopology: true });

export const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão ao banco de dados:'));
db.once('open', () => {
    console.log('Conectado ao banco de dados MongoDB.');
});
