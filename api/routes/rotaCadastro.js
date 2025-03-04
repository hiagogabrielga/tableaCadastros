import express from 'express'

import { apresentarCadastros, apresentarCadastrosPorNome, apresentarCadastroPorId, apresentarCadastrosPorFuncao, apresentarCadastrosPorEmail, apresentarCadastrosPorTelefone } from '../servicos/servico_cadastros/visualizarCadastros.js'
import { deletarCadastro } from '../servicos/servico_cadastros/excluirCadastros.js'
import { editarCadastro, editarCadastroParcial } from '../servicos/servico_cadastros/editarCadastros.js'
import { adicionarCadastro } from '../servicos/servico_cadastros/adicionarCadastro.js'

import { validarDados } from '../validar/validarCadastro.js'

const routerCadastros = express.Router()

routerCadastros.get('/', async (req, res) => {
    const { nome, email, telefone, funcao } = req.query
    let resposta;
    try {
        if (typeof nome === 'undefined' && typeof funcao === 'undefined' && typeof email === 'undefined' && typeof telefone === 'undefined') {
            resposta = await apresentarCadastros();
        } else if (typeof nome !== 'undefined') {
            resposta = await apresentarCadastrosPorNome(nome);
        } else if (typeof email !== 'undefined') {
            resposta = await apresentarCadastrosPorEmail(email);
        } else if (typeof telefone !== 'undefined') {
            resposta = await apresentarCadastrosPorTelefone(telefone);
        } else if (typeof funcao !== 'undefined') {
            resposta = await apresentarCadastrosPorFuncao(funcao);
        }
        return res.json(resposta)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const resposta = await apresentarCadastroPorId(id);
        if (resposta.length > 0) {
            return res.json(resposta);
        } else {
            return res.status(404).send("Nenhum cadastro encontrado.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.post('/', async (req, res) => {
    try {
        const { nome, email, telefone, funcao } = req.body;
        const cadastroValido = await validarDados(nome, email, telefone, funcao)

        if (!cadastroValido.status) {
            return res.status(400).send(cadastroValido.mensagem)
        }
        await adicionarCadastro(nome, email, telefone, funcao)
        return res.status(201).send("Cadastro feito com sucesso!");
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, funcao } = req.body;
        const camposAtualizar = {};
        if (nome) camposAtualizar.nome = nome;
        if (email) camposAtualizar.email = email;
        if (telefone) camposAtualizar.telefone = telefone;
        if (funcao) camposAtualizar.funcao = funcao;

        if (Object.keys(camposAtualizar).length === 0) {
            return res.status(400).send("Nenhum campo válido foi enviado para atualização.")
        }

        const cadastroValido = await validarDados(nome, email, telefone, funcao, true)

        if (!cadastroValido.status) {
            return res.status(400).send(cadastroValido.mensagem)
        }

        const resultado = await editarCadastroParcial(id, camposAtualizar)
        if (resultado.affectedRows > 0) {
            return res.status(200).send("Registro atualizado com sucesso.")
        } else {
            return res.status(404).send("Registro não encontrado")
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, email, telefone, funcao } = req.body
    try {
        if (nome == undefined || email == undefined || telefone == undefined || funcao == undefined) {
            return res.status(400).send("Nem todos os campos foram informados.")
        }

        const valoresValido = await validarDados(nome, email, telefone, funcao);
        if (!valoresValido.status) {
            return res.status(400).send(valoresValido.mensagem);
        }

        const resultado = await editarCadastro(id, nome, email, telefone, funcao)

        if (resultado.affectedRows > 0) {
            return res.status(200).send('Resgitro atualizado com sucesso.')
        } else {
            return res.status(404).send('Registro não encontrato.')
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const resposta = await deletarCadastro(id);
        if (resposta.affectedRows > 0) {
            return res.status(202).send("Registro deletado com sucesso.")
        } else {
            return res.status(404).send('Registro não encontrado.')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro interno do servidor.')
    }
})

export default routerCadastros;