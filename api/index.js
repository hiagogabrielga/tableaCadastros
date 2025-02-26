import express from 'express'
import cors from 'cors'
import { apresetarCadastros } from './servicos/visualizarCadastros.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensagem: 'Erro interno no servidor', erro: err.message });
});

app.get('/cadastros:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nome} = req.query
        const resposta = await apresetarCadastros();
        res.json(resposta)
    } catch (error) {
        res.status(404).json({erro: 'Erro ao buscar dados'})
    }
})

app.listen(9000, () => {
    const dataAtual = new Date()
    console.log('Servidor iniciado na porta 9000', dataAtual)
})