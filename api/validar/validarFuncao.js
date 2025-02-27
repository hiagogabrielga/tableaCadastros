import { apresentarFuncoesPorNome } from "../servicos/servico_funcoes/visualizarFuncao.js";

async function validarNomeFuncao(funcao) {
    const funcaoExistente = await apresentarFuncoesPorNome(funcao);

    if (funcaoExistente.length > 0) {
        return { status: false, mensagem: "Essa função já está cadastrada." };
    }

    return { status: true, mensagem: "Função válida." };
}

export { validarNomeFuncao };
