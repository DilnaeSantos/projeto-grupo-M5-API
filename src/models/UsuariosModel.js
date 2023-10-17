import mongoose from 'mongoose'

const Usuarios = mongoose.model('Usuarios', {    
    nome : String,
    email : String,
    telefone : String
})

export default Usuarios