import mongoose from 'mongoose'

const Artesao = mongoose.model('Artesao', {    
    nome : String,
    telefone : String,
    email : String,
    tipoDeArte : String,
    bio : String,
    senha : String
})

export default Artesao