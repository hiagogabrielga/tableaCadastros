'use client'
import { urlPadrao } from "../config.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VisualizarFuncoes() {
    const [dadosApi, setDadosApi] = useState([])
    async function pesquisarFuncoes() {
        try {
            const response = await fetch(`${urlPadrao}/funcoes`);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setDadosApi(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert(`Erro ao buscar dados: ${error.message}`);
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
                        </tr>
                    </thead>
                    <tbody className="corpoTabela">
                        {dadosApi.map((funcao) => (
                            <tr key={`${funcao.id}_Linha`} className="corpoLinhaTabela">
                                <th>{funcao.id}</th>
                                <th>{funcao.funcao}</th>
                                <th>{funcao.qtd_cadastros}</th>
                                <th>{funcao.dataalteracao}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}