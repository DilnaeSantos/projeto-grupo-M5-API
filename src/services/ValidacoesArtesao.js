import ArtesaoRepository from '../Repository/ArtesaoRepository.js';
import validator from 'validator';

class ValidacoesArtesao {
    static validaNome(nome) {
        if (nome.length >= 3) {
            return true
        }

        throw new Error("Nome inválido, o nome deve ter no mínimo 3 caracteres")

    }

    static validaTelefone(telefone) {
        const tel = parseInt(telefone);
        if (isNaN(tel) || telefone.length < 10 || telefone.length > 12) {
            throw new Error("Telefone inválido");
        }
    }

    static async validaEmail(email) {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        if (!regex.test(email)) {
            throw new Error("Email inválido");
        }

        const VerificaArtesao = await ArtesaoRepository.buscarArtesaoPorEmail(email);
        if (VerificaArtesao) {
            throw new Error("Email já cadastrado.");
        }
    }

    static validaEmailPatch(emailPatch) {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        if (!regex.test(emailPatch)) {
            throw new Error("Email inválido");
        }
    }

    static validaTipoDeArte(tipoDeArte) {
        if (tipoDeArte.length < 3) {
            throw new Error("tipoDeArte inválido");
        }
    }

    static validaBio(bio) {
        if (bio.length < 10) {
            throw new Error("bio inválida");
        }
    }

    static validaSenha(senha) {
        if (senha.length !== 6) {
            throw new Error("senha inválida");
        }
    }

    static validaUrl(url) {
        if (!validator.isURL(url)) {
            throw new Error("URL inválida");
        }
    }

    static async validaArtesao(nome, telefone, email, tipoDeArte, bio) {
        this.validaNome(nome);
        this.validaTelefone(telefone);
        await this.validaEmail(email);
        this.validaTipoDeArte(tipoDeArte);
        this.validaBio(bio);
    }
    
    static async validaArtesaoPorChave(key, value) {
        try {
            switch (key) {
                case "nome":
                    this.validaNome(value);
                    break;
                case "telefone":
                    this.validaTelefone(value);
                    break;
                case "email":
                    await this.validaEmail(value);
                    break;
                case "tipoDeArte":
                    this.validaTipoDeArte(value);
                    break;
                case "bio":
                    this.validaBio(value);
                    break;
                case "url":
                    this.validaUrl(value);
                    break;
                default:
                    throw new Error("Favor rever a requisição.");
            }
        } catch (error) {
            throw error;
        }
    }

    static async validaAtualizacaoArtesao(body) {
        for (const entradas of body) {
            if (entradas[0] === "email") {
                await this.validaEmail(entradas[1]);
            } else {
                this.validaArtesaoPorChave(...entradas);
            }
        }
    }
}

export default ValidacoesArtesao;
