import UsuariosRepository from '../Repository/UsuariosRepository.js'

class ValidacoesUsuarios {
    static validaNome(nome) {
        if (nome.length >= 3) {
            return true
        }

        throw new Error("Nome inválido")

    }

    static validaTelefone(telefone) {
        const tel = parseInt(telefone)
        if (tel != telefone && telefone.length < 10 && telefone.length > 12) {
            throw new Error("Telefone inválido")
        }

        return true
    }

    static async validaEmail(email) {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (regex.test(email)) {
            throw new Error("Email inválido");
        }

        const VerificaUsuario = await UsuariosRepository.buscarUsuariosPorEmail(email);
        if (VerificaUsuario) {
            throw new Error("Email já cadastrado.");
        }
    }

    static validaEmailPatch(emailPatch) {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!regex.test(emailPatch)) {
            throw new Error("Email inválido");
        }
    }

    static validaMensagem(mensagem) {
        if (mensagem.length >= 30) {
            return true
        }

        throw new Error("mensagem inválido")

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
                case "mensagem":
                    this.validaMensagem(value)
                    break;
                default:
                    throw new Error("Favor rever a requisição.")
            }
        } catch (error) {

            throw error
        }
        return true
    }

    static async validaUsuarios(nome, telefone, email,  mensagem) {
        try {
            ValidacoesUsuarios.validaNome(nome)
            ValidacoesUsuarios.validaTelefone(telefone)
            await ValidacoesUsuarios.validaEmail(email)
            ValidacoesUsuarios.validaMensagem(mensagem)
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

export default ValidacoesUsuarios;