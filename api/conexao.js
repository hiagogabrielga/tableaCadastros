import mysql from 'mysql2/promise'

const cadastros = [
    {
        root: 'root',
        senha: 'Suporte99',
        database: 'bancocrudcadastros'
    },
    {
        root: 'hiago',
        senha: '12345',
        database: 'bancocrudcadastros'
    },
    {
        root: 'root',
        senha: '12345',
        database: 'bancocrudcadastros'
    }
]

//Para caso eu troque de computador e queira executar o projeto, bastando trocar o index para o correspondente ao desejado.

const bd = cadastros[0]

const pool = mysql.createPool({
    host: 'localhost',
    user: `${bd.root}`,
    password: `${bd.senha}`,
    database: `${bd.database}`
})

export default pool