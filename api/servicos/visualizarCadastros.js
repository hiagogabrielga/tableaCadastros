import pool from '../conexao.js'

async function apresetarCadastros() {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const sql = 'SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id;';
        const [resultado] = await conexao.execute(sql)

        if (resultado.length > 0) {
            return resultado;

        } else {
            console.log('Erro ao buscar dados');

        }
    } catch (error) {

        console.log('Um erro aconteceu', error)
        throw error;

    } finally {

        if (conexao) {
            conexao.release()
        }
    };
};

async function apresetarCadastrosPorNome(nome) {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const sql = 'SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id WHERE c.nome LIKE %;';
        const [resultado] = await conexao.execute(sql)

        if (resultado.length > 0) {
            return resultado;

        } else {
            console.log('Erro ao buscar dados');
        }
        conexao.release()
    } catch (error) {
        console.log('Um erro aconteceu', error)
    }
};


export { apresetarCadastros, apresetarCadastrosPorNome }