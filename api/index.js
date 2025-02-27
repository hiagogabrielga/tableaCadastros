import express from 'express'
import cors from 'cors'
import routerCadastros from './routes/rotaCadastro.js'
import routerFuncoes from './routes/rotaFuncao.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensagem: 'Erro interno no servidor', erro: err.message });
});

app.use('/cadastros', routerCadastros)

app.use('/funcoes', routerFuncoes)

app.listen(9000, () => {
    const dataAtual = new Date()
    console.log('Servidor iniciado na porta 9000', dataAtual)
})