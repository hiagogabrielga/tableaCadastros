import express from 'express'
import { apresentarFuncoesPorNome, apresentarFuncaoPorId, apresentarFuncoes } from '../servicos/servico_funcoes/visualizarFuncao.js'
import { adicionarFuncao } from '../servicos/servico_funcoes/adicionarFuncao.js'
import { editarFuncao } from '../servicos/servico_funcoes/editarFuncao.js'
import { deletarFuncao, verificarUsoFuncao } from '../servicos/servico_funcoes/excluirFuncao.js'
import { validarNomeFuncao } from '../validar/validarFuncao.js'
const routerFuncoes = express.Router()

routerFuncoes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const emUso = await verificarUsoFuncao(id);
        if (emUso > 0) {
            return res.status(409).send('Não é possível excluir a função, pois ela está sendo usada em cadastros.');
        } else {
            const resposta = await deletarFuncao(id);
            if (resposta.affectedRows > 0) {
                res.status(202).send("Registro deletado com sucesso.");
            } else {
                res.status(404).send('Registro não encontrado.');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.');
    }
});

routerFuncoes.post('/', async (req, res) => {
    const { funcao } = req.body;
    try {
        const funcaoValida = await validarNomeFuncao(funcao)
        if (funcaoValida.status) {
            await adicionarFuncao(funcao)
            res.status(202).send("Cadastro feito com sucesso!");
        } else {
            res.status(400).send(funcaoValida.mensagem)
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerFuncoes.put('/:id', async (req, res) => {
    const { id } = req.params
    const { funcao } = req.body
    try {
        if (funcao == undefined) {
            res.status(400).send("Nem todos os campos foram informados.")
        } else {
            const resultado = await editarFuncao(id, funcao)
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


routerFuncoes.get('/', async (req, res) => {
    const { nome } = req.query
    try {
        if (typeof nome !== 'undefined') {
            const resultado = await apresentarFuncoesPorNome(nome)
            res.json(resultado)
        } else {
            const resultado = await apresentarFuncoes()
            res.json(resultado)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

routerFuncoes.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        if (typeof id !== 'undefined') {
            const resultado = await apresentarFuncaoPorId(id)
            res.json(resultado)
        } else {
            const resultado = await apresentarFuncoes()
            res.json(resultado)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor.')
    }
})

export default routerFuncoes