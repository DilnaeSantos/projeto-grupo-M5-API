import RepositoryEndereco from '../Repository/EnderecoRepository.js'

class ValidacoesEndereco {
    static validaCep(cep) {
        if (cep.length !== 8) {
            return true
        }

        throw new Error("Cep inválido")

    }

    static validaRua(rua) {
        if (rua.length > 3) {
            return true
        }
        
        throw new Error("Rua inválida")
    }

    static validaNumero(numero) {
        if (numero.length >= 2) {
            return true
        }
        
        throw new Error("numero inválida")
    }

    static validaCidade(cidade) {
        if (cidade.length >= 3) {
            return true
        }
        
        throw new Error("cidade inválida")
    }

    static validaBairro(bairro) {
        if (bairro.length >= 3) {
            return true
        }
        
        throw new Error("bairro inválido")
    }

    static async validaRepositoryPorChave(key, value) {
        try {
            switch (key) {
                case "cep":
                    this.validaCep(value)
                    break;
                case "rua":
                    this.validaRua(value)
                    break;
                case "numero":
                    this.validaNumero(value)
                    break;
                case "cidade":
                    this.validaCidade(value)
                    break;
                case "bairro":
                    this.validaBairro(value)
                    break;
                default:
                    throw new Error("Favor rever a requisição.")
            }
        } catch (error) {

            throw error
        }
        return true
    }

    static async validaRepository(cep, rua, numero, cidade, bairro) {
        try {
            ValidacoesRepository.validaCep(cep)
            ValidacoesRepository.validaRua(rua)
            ValidacoesRepository.validaNumero(numero)
            ValidacoesRepository.validaCidade(cidade)
            ValidacoesRepository.validaBairro(bairro)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async validaAtualizacaoRepository(body) {

        try {

            for (const entradas of body) {
                await this.validaRepositoryPorChave(...entradas)
            }

        } catch (error) {

            throw error

        }

    }
}

export default ValidacoesEndereco;