import UnidadeRepository from "../Repository/UnidadeRepository.js"
import ValidacoesUnidade from "../services/ValidacoesUnidae.js"

class UnidadeController {

    static rotas(app) {

        app.post("/Unidade", async (req, res) => {
            try {
                await ValidacoesUnidade.validaUnidade(req.body.nome, req.body.descricao)

                const Unidade = req.body

                const inserir = await UnidadeRepository.criarUnidade(Unidade)

                res.status(201).json(inserir)

            } catch (erro) {


                res.status(400).json({ message: erro.message })

            }
        })

        app.get("/unidades", async (req, res) => {
            try {
                const unidades = await UnidadeRepository.buscarTodosOsUnidades()
                res.status(200).json(unidades)
            } catch (erro) {
                res.status(404).json(erro.message)
            }
        })

        app.get("/Unidade/:id", async (req, res) => {
            try {
                const Unidade = await UnidadeRepository.buscarUnidadePorId(req.params.id)

                if (!Unidade._id) {
                    throw new Error("Unidade não encontrado para esse id")
                }
                res.status(200).json(Unidade)
            } catch (erro) {
                res.status(404).json({ message: erro.message, id: req.params.id })
            }
        })

        app.delete("/Unidade/:id", async (req, res) => {
            const id = req.params.id
            try {

                const Unidade = await UnidadeRepository.buscarUnidadePorId(id)

                if (!Unidade._id) {
                    throw new Erro("Unidade não encontrado")
                }

                const resposta = await UnidadeRepository.deletaUnidadePorId(id)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(404).json({ Erro: erro.message, id })
            }
        })

        app.patch("/Unidade/:id", async (req, res) => {
            const id = req.params.id
            const body = Object.entries(req.body)
            try {
                const Unidade = await UnidadeRepository.buscarUnidadePorId(id)

                if (!Unidade._id) {
                    throw new Error("Unidade não encontrado para esse id")
                }
                const unidadeAtualiza = req.body
                ValidacoesUnidade.validaAtualizacaoUnidades(body)

                const resposta = await UnidadeRepository.atualizaUnidadePorId(id, unidadeAtualiza)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(400).json({ message: erro.message, id })
            }

        })
    }
}

export default UnidadeController