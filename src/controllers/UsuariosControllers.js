import UsuariosRepository from "../Repository/UsuariosRepository.js"
import ValidacoesUsuario from "../services/ValidacoesUsuario.js"

class UsuariosController {

    /**
     * Método de rotas da entidade usuários
     * recebendo como argumento a instancia do Express
     * @param {Express} app 
     * usa-se o static para não precisar instanciar a classe
     * 
     * req e res são dois objetos muito importantes que representam uma solicitação do usuario 
     * (navegador, aplicativo móvel, etc.) para o servidor e a resposta que o servidor envia de 
     * volta para o usuario, respectivamente.
     */
    static rotas(app) {

        app.post("/usuario", async (req, res) => {
            try {
                await ValidacoesUsuario.validaUsuario(req.body.nome, req.body.telefone, req.body.email, req.body.cnpj, req.body.endereco)

                const usuario = req.body

                const inserir = await UsuariosRepository.criarUsuario(usuario)

                res.status(201).json(inserir)

            } catch (erro) {

                if (erro.message == "Email já cadastrado.") {
                    res.status(406).json({ message: erro.message })
                }

                res.status(400).json({ message: erro.message })

            }
        })

        app.get("/usuarios", async (req, res) => {
            try {
                const usuarios = await UsuariosRepository.buscarTodosOsUsuarios()
                res.status(200).json(usuarios)
            } catch (erro) {
                res.status(404).json(erro.message)
            }
        })

        app.get("/usuario/:id", async (req, res) => {
            try {
                const usuario = await UsuariosRepository.buscarUsuarioPorId(req.params.id)

                if (!usuario._id) {
                    throw new Error("Usuario não encontrado para esse id")
                }
                res.status(200).json(usuario)
            } catch (erro) {
                res.status(404).json({ message: erro.message, id: req.params.id })
            }
        })

        app.delete("/usuario/:id", async (req, res) => {
            const id = req.params.id
            try {

                const usuario = await UsuariosRepository.buscarUsuarioPorId(id)

                if (!usuario._id) {
                    throw new Erro("Usuario não encontrado")
                }

                const resposta = await UsuariosRepository.deletaUsuarioPorId(id)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(404).json({ Erro: erro.message, id })
            }
        })

        app.patch("/usuario/:id", async (req, res) => {
            const id = req.params.id
            const entries = Object.entries(req.body)
            try {
                const usuario = req.body

                await ValidacoesUsuario.validaAtualizacaoUsuario(entries)

                const resposta = await UsuariosRepository.atualizaUsuarioPorId(id, usuario)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(400).json({ message: erro.message, id })
            }

        })
    }
}

export default UsuariosController