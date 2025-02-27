import pool from '../../conexao.js';

async function executarQuery(sql, params = []) {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const [resultado] = await conexao.execute(sql, params);
        return resultado.length > 0 ? resultado : [];
    } catch (error) {
        console.error('Erro ao executar query:', error);
        throw error;
    } finally {
        if (conexao) conexao.release();
    }
}

async function apresentarFuncoes() {
    const sql = `SELECT id, funcao FROM funcoes;`;
    return await executarQuery(sql);
}

async function apresentarFuncaoPorId(id) {
    const sql = `SELECT id, funcao FROM funcoes WHERE id = ?;`;
    return await executarQuery(sql, [id]);
}

async function apresentarFuncoesPorNome(nome) {
    const sql = `SELECT id, funcao FROM funcoes WHERE funcao LIKE ?;`;
    return await executarQuery(sql, [`%${nome}%`]);
}

export { executarQuery, apresentarFuncoesPorNome, apresentarFuncaoPorId, apresentarFuncoes }