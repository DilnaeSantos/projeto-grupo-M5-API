import Unidades from "../models/UnidadesModel"
import RepositoryGeneral from "./RepositoryGeneral.js"

class UnidadesRepository {
    static async criarUnidade(unidade){
        const response =  await RepositoryGeneral.criar(Unidades, unidade)
        return response
    }

    static async buscarTodosAsUnidades(){
        const response = await RepositoryGeneral.buscarTodos(Unidades)
        return response
    }

    static async buscarUnidadePorId(id){
        const response = await RepositoryGeneral.buscarPorId(Unidades, id)
        return response
    }
    
    static async atualizaUnidadePorId(id, unidade){
        const response = await RepositoryGeneral.atualizaPorId(Unidades, id, unidade)
        return response
    }

    static async deletaUnidadePorId(id){
        const response = await RepositoryGeneral.deletarPorId(Unidades, id)
        return response
    }
}

export default UnidadesRepository;