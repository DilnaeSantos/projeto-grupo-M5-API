import ArtesaoRepository from '../Repository/ArtesaoRepository'

class ArtesaoRepository {
    static validaNome(nome) {
        if (nome.length >= 3) {
            return true
        }

        throw new Error("Nome inválido")

    }

    static validaTelefone(telefone) {
        const tel = parseInt(telefone)
        if (tel != telefone || telefone.length < 10 || telefone.length > 12) {
            throw new Error("Telefone inválido")
        }

        return true
    }

    static async validaEmail(email) {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        if (regex.test(email)) {
            const VerificaArtesao = await ArtesaoRepository.buscarArtesaoPorEmail(email)
            if (VerificaArtesao) {
                throw new Error("Email já cadastrado.")
            }
            return true

        }

        throw new Error("Email inválido")

    }

    static validaEmailPatch(emailPatch) {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        if (regex.test(emailPatch)) {
            return true
        }

        throw new Error("Email inválido")

    }

    static validaTipoDeArte(tipoDeArte) {
        if (tipoDeArte.length >= 3) {
            return true
        }

        throw new Error("tipoDeArte inválido")

    }

    static validaBio(bio) {
        if (bio.length >= 10) {
            return true
        }

        throw new Error("tipoDeArte inválido")

    }

    static async validaArtesaoPorChave(key, value) {
        try {
            switch (key) {
                case "nome":
                    this.validaNome(value)
                    break;
                case "telefone":
                    this.validaTelefone(value)
                    break;
                case "email":
                    await this.validaEmail(value)
                    break;
                case "tipoDeArte":
                    this.validaTipoDeArte(value)
                    break;
                case "bio":
                    this.validaBio(value)
                    break;
                default:
                    throw new Error("Favor rever a requisição.")
            }
        } catch (error) {

            throw error
        }
        return true
    }

    static async validaArtesao(nome, telefone, email, tipoDeArte, bio) {
        try {
            ValidacoesArtesoes.validaNome(nome)
            ValidacoesArtesoes.validaTelefone(telefone)
            await ValidacoesArtesoes.validaEmail(email)
            ValidacoesArtesoes.validaTipoDeArte(tipoDeArte)
            ValidacoesArtesoes.validaEndereco(bio)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async validaAtualizacaoArtesao(body) {

        try {

            for (const entradas of body) {
                await this.validaArtesaoPorChave(...entradas)
            }

        } catch (error) {

            throw error

        }

    }
}

export default ArtesaoRepository;