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
        <div>
            <div>
                <table>
                    <thead>
                        <tr key="cabecalhoCadastros">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Função</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosApi.map((cadastro) => (
                            <tr key={`${cadastro.id}_Linha`}>
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
