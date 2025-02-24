import express from 'express'
import cors from 'cors'
import { apresetarCadastros } from './servicos/visualizarCadastros.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/cadastros', async (req, res) => {
    try {
        const resposta = apresetarCadastros()
        res.json(resposta)
    } catch (error) {
        
    }
})


app.listen(9000, () => {
    const dataAtual = new Date()
    console.log('Servidor iniciado na porta 9000', dataAtual)
})