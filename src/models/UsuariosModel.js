import mongoose from 'mongoose'

const Usuarios = mongoose.model('Usuarios', {    
    nome : String,
    email : String,
    telefone : String,
    mensagem : String
})

export default Usuarios