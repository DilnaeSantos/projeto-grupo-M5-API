import ProdutoRepository from '../Repository/ProdutoRepository'

class ValidacoesProduto {
    static validaNome(nome) {
        if (nome.length >= 3) {
            return true
        }

        throw new Error("Nome inválido, o nome deve ter no mínimo 3 caracteres")

    }

    static validaDescricao(descricao) {

        if (descricao.length >= 20 && descricao.length <= 350) {
            return true
        }
        else {
            throw new Error("A descrição deve conter no mínimo 20 e no máximo 350 caracteres")
        }
    }

    static validaPreco(preco) {
        if (preco.length >= 0.01) {
            return true
        }

        throw new Error("Preço invalido")

    }

    static validaQtdEstoque(qtdEstoque) {
        if (qtdEstoque.length >= 1) {
            return true
        }

        throw new Error("Estoque Vazio")

    }

    static async validaEmailArtesao(emailArtesao) {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        if (regex.test(emailArtesao)) {
            const VerificaProduto = await ProdutoRepository.buscarProdutoPorEmailArtesao(emailArtesao)
            if (VerificaProduto) {
                throw new Error("EmailArtesao já cadastrado.")
            }
            return true

        }

        throw new Error("EmailArtesao inválido, favor rever a requisição.")

    }

    static validaEmailArtesaoPatch(emailArtesaoPatch) {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        if (regex.test(emailArtesaoPatch)) {
            return true
        }

        throw new Error("EmailArtesao inválido, favor rever a requisição.")

    }
    
    static async validaProdutoPorChave(key, value) {
        try {
            switch (key) {
                case "nome":
                    this.validaNome(value)
                    break;
                case "descricao":
                    this.validaDescricao(value)
                    break;
                case "preco":
                    this.validaPreco(value)
                    break;
                case "qtdEstoque":
                    this.validaQtdEstoque(value)
                    break; 
                case "emailArtesao":
                    this.validaEmailArtesao(value)
                    break;    
                default:
                    throw new Error("Favor rever a requisição.")
            }
        } catch (error) {

            throw error
        }
        return true
    }

    static async validaProduto(nome, descricao, preco, emailArtesao) {
        try {
            ValidacoesProduto.validaNome(nome)
            ValidacoesProduto.validaDescricao(descricao)
            ValidacoesProduto.validaPreco(preco)
            ValidacoesProduto.validaQtdEstoque(qtdEstoque)
            ValidacoesProduto.validaEmailArtesao(emailArtesao)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async validaAtualizacaoProduto(body) {

        try {

            for (const entradas of body) {
                await this.validaProdutoPorChave(...entradas)
            }

        } catch (error) {

            throw error

        }

    }
}

export default ValidacoesProduto

