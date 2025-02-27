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

async function adicionarFuncao(funcao) {
    const sql = `INSERT INTO funcoes (funcao) VALUE (?);`;
    return await executarQuery(sql, [funcao]);
}

export { adicionarFuncao }