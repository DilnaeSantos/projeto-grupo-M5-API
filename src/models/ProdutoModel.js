import mongoose from 'mongoose'

const Produto = mongoose.model('Produto', {    
    nome : String,
    descricao : String,
    preco : Number,
    qtdEstoque : Number,
    emailArtesao : String,
    url : String
})

export default Produto