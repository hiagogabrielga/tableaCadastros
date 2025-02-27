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

async function verificarUsoFuncao(id) {
    const sql = `SELECT COUNT(*) AS total FROM cadastros WHERE funcao = ?;`;
    const resultado = await executarQuery(sql, [id]);
    return resultado[0].total;
}

async function deletarFuncao(id) {
    const emUso = await verificarUsoFuncao(id);
    if (emUso > 0) {
        console.error('Não é possível excluir a função, pois ela está sendo usada.')
    }
    const sql = `DELETE FROM funcoes WHERE id = ?;`;
    return await executarQuery(sql, [id]);
}

export { deletarFuncao, verificarUsoFuncao };
