import Artesoes from "../models/ArtesaoModel.js"
import RepositoryGeneral from "./RepositoryGeneral.js"

class ArtesoesRepository {
    static async criarArtesao(artesao){
        const response =  await RepositoryGeneral.criar(Artesoes, artesao)
        return response
    }

    static async buscarTodosOsArtesoes(){
        const response = await RepositoryGeneral.buscarTodosOsArtesoes(Artesoes)
        return response
    }

    static async buscarArtesaoPorId(id){
        const response = await RepositoryGeneral.buscarPorId(Artesoes, id)
        return response
    }

    static async buscarArtesaoPorEmail(email){
        const response = await RepositoryGeneral.buscarPorChave(Artesoes, 'email', email)
        return response
    }
    
    static async atualizaArtesaoPorId(id, artesao){
        const response = await RepositoryGeneral.atualizaPorId(Artesoes, id, artesao)
        return response
    }

    static async deletaArtesaoPorId(id){
        const response = await RepositoryGeneral.deletarPorId(Artesoes, id)
        return response
    }
}

export default ArtesoesRepository;