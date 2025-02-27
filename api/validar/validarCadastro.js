import { apresentarFuncoes } from '../servicos/servico_funcoes/visualizarFuncao.js';
import { executarQuery } from '../servicos/servico_funcoes/visualizarFuncao.js';

function validaNome(nome) {
    const regexNome = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    return nome.length >= 2 && regexNome.test(nome);
}

async function verificarEmailExistente(email) {
    const sql = `SELECT COUNT(*) AS total FROM cadastros WHERE email = ?;`;
    const resultado = await executarQuery(sql, [email]);
    return resultado[0].total > 0;
}

async function validaEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailFormatadoValido = regexEmail.test(email);
    
    if (!emailFormatadoValido) return false;
    
    return !(await verificarEmailExistente(email));
}

function validaTelefone(telefone) {
    const regexTelefone = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;
    return regexTelefone.test(telefone);
}

async function validaFuncao(funcao) {
    const funcoes = await apresentarFuncoes();
    return funcoes.some(f => f.id === funcao);
}

export async function validarDados(nome, email, telefone, funcao) {
    let erros = [];

    if (!validaNome(nome)) {
        erros.push("Nome inválido (mínimo 2 caracteres, sem números ou símbolos).");
    }

    if (!(await validaEmail(email))) {
        erros.push("E-mail inválido ou já cadastrado.");
    }

    if (!validaTelefone(telefone)) {
        erros.push("Telefone inválido (formato esperado: (XX) XXXXX-XXXX).");
    }

    if (!(await validaFuncao(funcao))) {
        erros.push("Função inválida (deve ser um ID válido de função).");
    }

    if (erros.length > 0) {
        return { status: false, mensagem: erros.join(" ") };
    }

    return { status: true, mensagem: "" };
}
