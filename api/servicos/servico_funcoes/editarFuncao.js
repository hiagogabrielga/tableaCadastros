import pool from '../../conexao.js';

async function executarQuery(sql, params = []) {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const [resultado] = await conexao.execute(sql, params);
        return resultado;
    } catch (error) {
        console.error('Erro ao executar query:', error);
        throw error;
    } finally {
        if (conexao) conexao.release();
    }
}

async function editarFuncao(id, funcao) {
    const sql = `UPDATE funcoes SET funcao = ? WHERE id = ?;`;
    return await executarQuery(sql, [funcao, id]);
}

export { editarFuncao }