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
    const sql = `SELECT f.id, f.funcao, f.dataalteracao, COUNT(c.id) AS qtd_cadastros FROM funcoes f LEFT JOIN cadastros c ON c.funcao = f.id GROUP BY f.id, f.funcao;`;
    return await executarQuery(sql);
}

async function apresentarFuncaoPorId(id) {
    const sql = `SELECT f.id, f.funcao, f.dataalteracao, COUNT(c.id) AS qtd_cadastros FROM funcoes f LEFT JOIN cadastros c ON c.funcao = f.id  WHERE f.id = ? GROUP BY f.id, f.funcao;`;
    return await executarQuery(sql, [id]);
}

async function apresentarFuncoesPorNome(nome) {
    const sql = `SELECT f.id, f.funcao, f.dataalteracao, COUNT(c.id) AS qtd_cadastros FROM funcoes f LEFT JOIN cadastros c ON c.funcao = f.id  WHERE f.funcao LIKE ? GROUP BY f.id, f.funcao;`;
    return await executarQuery(sql, [`%${nome}%`]);
}

export { executarQuery, apresentarFuncoesPorNome, apresentarFuncaoPorId, apresentarFuncoes }