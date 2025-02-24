import express from 'express'
import cors from 'cors'
import pool from './conexao.js'

const app = express()

app.use(cors())