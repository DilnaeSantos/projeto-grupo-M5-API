import EnderecoRepository from "../Repository/EnderecoRepository.js";
import ValidacoesEndereco from "../services/ValidacoesEndereco.js";

class EnderecoController {

    static rotas(app) {

        app.post("/endereco", async (req, res) => {
            try {
                await ValidacoesEndereco.validaEndereco(req.body.cliente, req.body.produto, req.body.descricao)

                const endereco = req.body

                const inserir = await EnderecoRepository.criarEndereco(endereco)

                res.status(201).json(inserir)

            } catch (erro) {

                if (erro.message == "endereço já cadastrado.") {
                    res.status(406).json({ message: erro.message })
                }
                else {
                    res.status(400).json({ message: erro.message })
                }
            }
        })

        app.get("/endereco", async (req, res) => {
            try {
                const enderecos = await EnderecoRepository.buscarTodosOsEnderecos()
                res.status(200).json(enderecos)
            } catch (erro) {
                res.status(404).json(erro.message)
            }
        })

        app.get("/endereco/:id", async (req, res) => {
            try {
                const endereco = await EnderecoRepository.buscarEnderecoPorId(req.params.id)

                if (!endereco._id) {
                    throw new Error("endereco não encontrado para esse id")
                }
                res.status(200).json(endereco)
            } catch (erro) {
                res.status(404).json({ message: erro.message, id: req.params.id })
            }
        })

        app.delete("/endereco/:id", async (req, res) => {
            const id = req.params.id
            try {

                const endereco = await EnderecoRepository.buscarEnderecoPorId(id)

                if (!endereco._id) {
                    throw new Erro("Endereco não encontrado")
                }

                const resposta = await EnderecoRepository.deletaEnderecoPorId(id)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(404).json({ Erro: erro.message, id })
            }
        })

        app.patch("/endereco/:id", async (req, res) => {
            const id = req.params.id
            const body = Object.entries(req.body)
            try {
        
                const endereco = await EnderecoRepository.buscarEnderecoPorId(id)

                const enderecoAtualiza = req.body

                if (!endereco._id) {
                    throw new Error("endereco não encontrado para esse id")
                }

                ValidacoesEndereco.validaAtualizacaoEnderecos(body)

                const resposta = await EnderecoRepository.atualizaEnderecoPorId(id, enderecoAtualiza)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(400).json({ message: erro.message, id })
            }

        })
    }
}

export default EnderecoController