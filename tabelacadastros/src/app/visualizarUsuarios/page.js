'use client'
import { urlPadrao } from "../config.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VisualizarCadastros() {
    const [dadosApi, setDadosApi] = useState([])
    async function pesquisarCadastros() {
        try {
            const response = await fetch(`${urlPadrao}/cadastros`);

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
        pesquisarCadastros()
    }, [])
    return (
        <div className="containerPreTabela">
            <div className="containerTabela">
                <h2>Tabela dos Cadastros</h2>
                <table className="tabela">
                    <thead className="cabecalhoTabela">
                        <tr key="cabecalhoCadastros" className="cabecalhoLinhaTabela">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Função</th>
                        </tr>
                    </thead>
                    <tbody className="corpoTabela">
                        {dadosApi.map((cadastro) => (
                            <tr key={`${cadastro.id}_Linha`} className="corpoLinhaTabela">
                                <th>{cadastro.id}</th>
                                <th>{cadastro.nome}</th>
                                <th>{cadastro.email}</th>
                                <th>{cadastro.telefone}</th>
                                <th>{cadastro.funcao}</th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
