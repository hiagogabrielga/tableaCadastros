'use client'
import { urlPadrao } from "../config.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash, NotebookPen } from "lucide-react";

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

    async function handleExcluir(id) {
        if (!confirm(`Tem certeza que deseja excluir o cadastro ID ${id}?`)) return;

        try {
            const response = await fetch(`${urlPadrao}/cadastros/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.status} - ${response.statusText}`);
            }

            // Remover do estado local para atualização imediata na tela
            setDadosApi(dadosApi.filter((cadastro) => cadastro.id !== id));
            alert("Cadastro excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir cadastro:", error);
            alert(`Erro ao excluir: ${error.message}`);
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
                            <th></th>
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
                                <th className="thBtn">
                                    <Link href={`/editar/${cadastro.id}`} className="btnEdit"><NotebookPen/></Link>
                                    <button onClick={() => handleExcluir(cadastro.id)} className="btnExcluir">
                                        <Trash />
                                    </button>
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
