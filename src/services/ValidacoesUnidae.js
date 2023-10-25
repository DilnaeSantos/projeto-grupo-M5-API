import UnidadeRepository from '../Repository/UnidadeRepository.js'

class ValidacoesUnidade {
    static validaNome(nome) {
        if (nome.length >= 3) {
            return true
        }

        throw new Error("Nome inválido")

    }

    static validaIdEndereco(idEndereco) {
        if (idEndereco.length <= 1) {
            throw new Error("IdEndereco inválido")
        }

        return true
    }


    static async validaUnidadePorChave(key, value) {
        try {
            switch (key) {
                case "nome":
                    this.validaNome(value)
                    break;
                case "idEndereco":
                    this.validaIdEndereco(value)
                    break;
                default:
                    throw new Error("Favor rever a requisição.")
            }
        } catch (error) {

            throw error
        }
        return true
    }

    static async validaUnidade(nome, idEndereco) {
        try {
            ValidacoesUnidade.validaNome(nome)
            ValidacoesUnidade.validaIdEndereco(idEndereco)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async validaAtualizacaoUnidade(body) {

        try {

            for (const entradas of body) {
                await this.validaUnidadePorChave(...entradas)
            }

        } catch (error) {

            throw error

        }

    }
}

export default ValidacoesUnidade;