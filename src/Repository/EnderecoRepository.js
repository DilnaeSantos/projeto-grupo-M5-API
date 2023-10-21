import Enderecos from "../models/EnderecoModel.js"
import RepositoryGeneral from "./RepositoryGeneral.js"

class EnderecosRepository {
    static async criarEndereco(endereco){
        const response =  await RepositoryGeneral.criar(Enderecos, endereco)
        return response
    }

    static async buscarTodosOsEnderecos(){
        const response = await RepositoryGeneral.buscarTodos(Enderecos)
        return response
    }

    static async buscarEnderecoPorId(id){
        const response = await RepositoryGeneral.buscarPorId(Enderecos, id)
        return response
    }

    static async atualizaEnderecoPorId(id, endereco){
        const response = await RepositoryGeneral.atualizaPorId(Enderecos, id, endereco)
        return response
    }

    static async deletaEnderecoPorId(id){
        const response = await RepositoryGeneral.deletarPorId(Enderecos, id)
        return response
    }
}

export default EnderecosRepository;