import mongoose from 'mongoose'

const Endereco = mongoose.model('Endereco', {    
    cep : String,
    rua : String,
    numero : String,
    bairro : String,
    cidade : String
})

export default Endereco