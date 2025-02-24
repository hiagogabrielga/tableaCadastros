import pool from '../conexao.js'

async function apresetarCadastros(){
    try{
        const conexao = await pool.getConnection();
        const sql = 'SELECT id.cadastros, nome.cadastros, email.cadastros, telefone.cadastros, funcao.funcoes FROM cadastros, funcoes WRERE funcao.cadastro = id.funcoes;'
        const [resultado] = conexao.execute(sql)
        if (resultado.lenght > 0) {
            console.log('Erro ao buscar dados');
        } else {
            return resultado[0];
        };
    } catch (error){
        console.log('Um erro aconteceu', error)
    };
};


export { apresetarCadastros }