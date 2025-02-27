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

async function apresentarCadastros() {
    const sql = `SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id;`;
    return await executarQuery(sql);
}

async function apresentarCadastroPorId(id) {
    const sql = `SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id WHERE c.id = ?;`;
    return await executarQuery(sql, [id]);
}

async function apresentarCadastrosPorNome(nome) {
    const sql = `SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id WHERE c.nome LIKE ?;`;
    return await executarQuery(sql, [`%${nome}%`]);
}

async function apresentarCadastrosPorEmail(email) {
    const sql = `SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id WHERE c.email LIKE ?;`;
    return await executarQuery(sql, [`%${email}%`]);
}

async function apresentarCadastrosPorTelefone(telefone) {
    const sql = `SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id WHERE c.telefone LIKE ?;`;
    return await executarQuery(sql, [`%${telefone}%`]);
}

async function apresentarCadastrosPorFuncao(funcao) {
    const sql = `SELECT c.id, c.nome, c.email, c.telefone, f.funcao FROM cadastros c JOIN funcoes f ON c.funcao = f.id WHERE f.funcao LIKE ?;`;
    return await executarQuery(sql, [`%${funcao}%`]);
}

export { apresentarCadastros, apresentarCadastrosPorNome, apresentarCadastroPorId, apresentarCadastrosPorFuncao, apresentarCadastrosPorEmail, apresentarCadastrosPorTelefone };
