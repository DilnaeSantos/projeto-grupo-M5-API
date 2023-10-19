import UsuariosRepository from '../Repository/UsuariosRepository'

class UsuariosRepository {
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
            const VerificaUsuarios = await UsuariosRepository.buscarUsuariosPorEmail(email)
            if (VerificaUsuarios) {
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

    static async validaUsuariosPorChave(key, value) {
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
                default:
                    throw new Error("Favor rever a requisição.")
            }
        } catch (error) {

            throw error
        }
        return true
    }

    static async validaUsuarios(nome, telefone, email) {
        try {
            ValidacoesUsuarios.validaNome(nome)
            ValidacoesUsuarios.validaTelefone(telefone)
            await ValidacoesUsuarios.validaEmail(email)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async validaAtualizacaoUsuarios(body) {

        try {

            for (const entradas of body) {
                await this.validaUsuariosPorChave(...entradas)
            }

        } catch (error) {

            throw error

        }

    }
}

export default UsuariosRepository;