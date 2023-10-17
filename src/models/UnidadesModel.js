import mongoose from 'mongoose'

const Unidades = mongoose.model('Unidades', {    
    nome : String,
    IdEndereco : String,
})

export default Unidades