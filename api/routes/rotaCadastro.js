import express from 'express'

import { apresentarCadastros, apresentarCadastrosPorNome, apresentarCadastroPorId, apresentarCadastrosPorFuncao, apresentarCadastrosPorEmail, apresentarCadastrosPorTelefone } from '../servicos/servico_cadastros/visualizarCadastros.js'
import { deletarCadastro } from '../servicos/servico_cadastros/excluirCadastros.js'
import { editarCadastro, editarCadastroParcial } from '../servicos/servico_cadastros/editarCadastros.js'
import { adicionarCadastro } from '../servicos/servico_cadastros/adicionarCadastro.js'

import { validarDados } from '../validar/validarCadastro.js'

const routerCadastros = express.Router()

routerCadastros.get('/', async (req, res) => {
    const { nome, email, telefone, funcao } = req.query
    try {
        if (typeof nome === 'undefined' && typeof funcao === 'undefined' && typeof email === 'undefined' && typeof telefone === 'undefined') {
            const resposta = await apresentarCadastros();
            res.json(resposta)
        } else if (typeof nome !== 'undefined') {
            const resposta = await apresentarCadastrosPorNome(nome);
            res.json(resposta)
        } else if (typeof email !== 'undefined') {
            const resposta = await apresentarCadastrosPorEmail(email);
            res.json(resposta)
        } else if (typeof telefone !== 'undefined') {
            const resposta = await apresentarCadastrosPorTelefone(telefone);
            res.json(resposta)
        } else if (typeof funcao !== 'undefined') {
            const resposta = await apresentarCadastrosPorFuncao(funcao);
            res.json(resposta)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        if (typeof id === 'undefined') {
            const resposta = await apresentarCadastros();
            res.json(resposta)
        } else if (typeof id !== 'undefined') {
            const resposta = await apresentarCadastroPorId(id);
            res.json(resposta)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.post('/', async (req, res) => {
    const { nome, email, telefone, funcao } = req.body;
    try {
        const cadastroValido = await validarDados(nome, email, telefone, funcao)
        if (cadastroValido.status) {
            await adicionarCadastro(nome, email, telefone, funcao)
            res.status(202).send("Cadastro feito com sucesso!");
        } else {
            res.status(400).send(cadastroValido.mensagem)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, funcao } = req.body;
    const camposAtualizar = {};

    if (nome) camposAtualizar.nome = nome;
    if (email) camposAtualizar.email = email;
    if (telefone) camposAtualizar.telefone = telefone;
    if (funcao) camposAtualizar.funcao = funcao;

    try {
        if (Object.keys(camposAtualizar).length === 0) {
            res.status(400).send("Nenhum campo válido foi enviado para atualização.")
        } else {
            const resultado = await editarCadastroParcial(id, camposAtualizar)
            if (resultado.affectedRows > 0) {
                res.status(202).send("Registro atualizado com sucesso.")
            } else {
                res.status(404).send("Registro não encontrado")
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, email, telefone, funcao } = req.body
    try {
        if (nome == undefined || email == undefined || telefone == undefined || funcao == undefined) {
            res.status(400).send("Nem todos os campos foram informados.")
        } else {
            const resultado = await editarCadastro(id, nome, email, telefone, funcao)
            if (resultado.affectedRows > 0) {
                res.status(202).send('Resgitro atualizado com sucesso.')
            } else {
                res.status(404).send('Registro não encontrato.')
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerCadastros.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const resposta = await deletarCadastro(id);
        if (resposta.affectedRows > 0) {
            res.status(202).send("Registro deletado com sucesso.")
        } else {
            res.status(404).send('Registro não encontrado, seu burro.')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

export default routerCadastros;