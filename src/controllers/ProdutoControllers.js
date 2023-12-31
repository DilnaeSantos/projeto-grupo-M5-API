import ProdutosRepository from "../Repository/ProdutoRepository.js"
import ValidacoesProdutos from "../services/ValidacoesProduto.js"

class ProdutosController {

    static rotas(app) {

        app.post("/produto", async (req, res) => {
            try {
                await ValidacoesProdutos.validaProduto(req.body.nome, req.body.descricao, req.body.preco, req.body.qtdEstoque, req.body.emailArtesao, req.body.url)

                const produto = req.body

                const inserir = await ProdutosRepository.criarProduto(produto)

                res.status(201).json(inserir)

            } catch (erro) {


                res.status(400).json({ message: erro.message })

            }
        })

        app.get("/produtos", async (req, res) => {
            try {
                const produtos = await ProdutosRepository.buscarTodosOsProdutos()
                res.status(200).json(produtos)
            } catch (erro) {
                res.status(404).json(erro.message)
            }
        })

        app.get("/produto/:id", async (req, res) => {
            try {
                const produto = await ProdutosRepository.buscarProdutoPorId(req.params.id)

                if (!produto._id) {
                    throw new Error("Produto não encontrado para esse id")
                }
                res.status(200).json(produto)
            } catch (erro) {
                res.status(404).json({ message: erro.message, id: req.params.id })
            }
        })

        app.delete("/produto/:id", async (req, res) => {
            const id = req.params.id
            try {

                const produto = await ProdutosRepository.buscarProdutoPorId(id)

                if (!produto._id) {
                    throw new Erro("Produto não encontrado")
                }

                const resposta = await ProdutosRepository.deletaProdutoPorId(id)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(404).json({ Erro: erro.message, id })
            }
        })

        app.patch("/produto/:id", async (req, res) => {
            const id = req.params.id
            const body = Object.entries(req.body)
            try {
                const produto = await ProdutosRepository.buscarProdutoPorId(id)

                if (!produto._id) {
                    throw new Error("Produto não encontrado para esse id")
                }
                const produtoAtualiza = req.body
                ValidacoesProdutos.validaAtualizacaoProduto(body)

                const resposta = await ProdutosRepository.atualizaProdutoPorId(id, produtoAtualiza)

                res.status(200).json(resposta)

            } catch (erro) {
                res.status(400).json({ message: erro.message, id })
            }

        })
    }
}

export default ProdutosController;