import ArtesaoRepository from "../Repository/ArtesaoRepository.js"
import ValidacoesArtesao from "../services/ValidacoesArtesao.js"
import db from '../../app.js'
class ArtesaoController {

    /**
     * Método de rotas da entidade usuários
     * recebendo como argumento a instancia do Express
     * @param {Express} app 
     * usa-se o static para não precisar instanciar a classe
     * 
     * req e res são dois objetos muito importantes que representam uma solicitação do Artesao 
     * (navegador, aplicativo móvel, etc.) para o servidor e a resposta que o servidor envia de 
     * volta para o Artesao, respectivamente.
     */
    static rotas(app) {

        app.post("/loginArtesao", async (req, res) => {
            const { email } = req.body;
            console.log(email)
            // Agora você pode usar a constante db que foi importada
            const password = req.get("X-Password");
            console.log(password)
            const artesao = await ArtesaoRepository.buscarArtesaoPorEmail(email)
          
            if (!artesao) {
              return res
                .status(401)
                .json({ message: "Email não encontrado.", success: false });
            }
            console.log(artesao)
            if (artesao.senha !== password) {
              return res
                .status(401)
                .json({ message: "Senha incorreta.", success: false });
            }
          
            res.status(200).json({ data: artesao, success: true });
        });

        app.post("/artesaos", async (req, res) => {
            try {
                await ValidacoesArtesao.validaArtesao(req.body.nome, req.body.telefone, req.body.email, req.body.tipoDeArte, req.body.bio, req.body.senha, req.body.url)

                const artesao = req.body

                const inserir = await ArtesaoRepository.criarArtesao(artesao)

                res.status(201).json(inserir)

            } catch (erro) {
                if (erro.message == "Email já cadastrado.") {
                    res.status(406).json({ message: erro.message })
                } 
                
                res.status(400).json({ message: erro.message })
            
            } 
        })

        app.get("/artesao", async (req, res) => {
            try {
                const artesao = await ArtesaoRepository.buscarTodosOsArtesoes()
                res.status(200).json(artesao)
            } catch (erro) {
                res.status(404).json(erro.message)
            }
        })

        app.get("/artesao/:id", async (req, res) => {
            try {
                const artesao = await ArtesaoRepository.buscarArtesaoPorId(req.params.id)

                if (!artesao._id) {
                    throw new Error("Artesao não encontrado para esse id")
                }
                res.status(200).json(artesao)
            } catch (erro) {
                res.status(404).json({ message: erro.message, id: req.params.id })
            }
        })

        app.delete("/artesao/:id", async (req, res) => {
            const id = req.params.id
            try {

                const artesao = await ArtesaoRepository.buscarArtesaoPorId(id)

                if (!artesao._id) {
                    throw new Erro("Artesao não encontrado")
                }

                const resposta = await ArtesaoRepository.deletaArtesaoPorId(id)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(404).json({ Erro: erro.message, id })
            }
        })

        app.patch("/artesao/:id", async (req, res) => {
            const id = req.params.id
            const entries = Object.entries(req.body)
            try {
                const artesao = req.body

                await ValidacoesArtesao.validaAtualizacaoArtesao(entries)

                const resposta = await ArtesaoRepository.atualizaArtesaoPorId(id, artesao)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(400).json({ message: erro.message, id })
            }

        })
    }
}

export default ArtesaoController