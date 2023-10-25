import Usuarios from "../models/UsuariosModel.js"
import RepositoryGeneral from "./RepositoryGeneral.js"

class UsuariosRepository {
    static async criarUsuario(Usuario){
        const response =  await RepositoryGeneral.criar(Usuarios, Usuario)
        return response
    }

    static async buscarTodosOsUsuarios(){
        const response = await RepositoryGeneral.buscarTodos(Usuarios)
        return response
    }

    static async buscarUsuarioPorId(id){
        const response = await RepositoryGeneral.buscarPorId(Usuarios, id)
        return response
    }

    static async buscarUsuariosPorEmail(email){
        const response = await RepositoryGeneral.buscarPorChave(Usuarios, 'email', email)
        return response
    }

    static async atualizaUsuarioPorId(id, Usuario){
        const response = await RepositoryGeneral.atualizaPorId(Usuarios, id, Usuario)
        return response
    }

    static async deletaUsuarioPorId(id){
        const response = await RepositoryGeneral.deletarPorId(Usuarios, id)
        return response
    }
}

export default UsuariosRepository;