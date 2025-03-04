'use client'
import { urlPadrao } from "../config.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash, NotebookPen } from "lucide-react";

export default function VisualizarFuncoes() {
    const [dadosApi, setDadosApi] = useState([])
    async function pesquisarFuncoes() {
        try {
            const response = await fetch(`${urlPadrao}/funcoes`);

            if (!response.ok) {
                const responseData = await response.text();
                return alert(responseData)
            }

            const data = await response.json();
            setDadosApi(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert(`Erro ao buscar dados: ${error.message}`);
        }
    }

    async function excluirFuncao(id) {
        if (!confirm(`Tem certeza que deseja excluir a função de ID ${id}?`)) return;

        try {
            const response = await fetch(`${urlPadrao}/funcoes/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                const responseData = await response.text();
                return alert(responseData)
            }
            
            setDadosApi(dadosApi.filter((funcao) => funcao.id !== id));
            alert("Função excluída com sucesso!");
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert(`Erro ao excluir: ${error.message}`);
        }
    }

    useEffect(() => {
        pesquisarFuncoes()
    }, [])
    return (
        <div className="containerPreTabela">
            <div className="containerTabela">
                <h2>Tabela das Funções</h2>
                <table className="tabela">
                    <thead className="cabecalhoTabela">
                        <tr key="cabecalhoFuncoes" className="cabecalhoLinhaTabela">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cadastros</th>
                            <th>Última altareção</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="corpoTabela">
                        {dadosApi.map((funcao) => (
                            <tr key={`${funcao.id}_Linha`} className="corpoLinhaTabela">
                                <th>{funcao.id}</th>
                                <th>{funcao.funcao}</th>
                                <th>{funcao.qtd_cadastros}</th>
                                <th>{funcao.dataalteracao}</th>
                                <th className="thBtn">
                                    <Link href={`/tabelaEditarFuncao/${funcao.id}`} className="btnEdit"><NotebookPen /></Link>
                                    <button className="btnExcluir" onClick={() => excluirFuncao(funcao.id)}>
                                        <Trash />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}