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
  //origin: 'http://seusite.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

const port = process.env.PORT || 3000
const USER_DB = process.env.USER_DB || "local"
const DATABASE = process.env.DATABASE || "local"
const PASSWORD = process.env.PASSWORD || "local"
const CLUSTER = process.env.CLUSTER || "local"

mongoose.connect(`mongodb+srv://${USER_DB}:${PASSWORD}@${CLUSTER}.${DATABASE}.mongodb.net/${DATABASE}`)
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
