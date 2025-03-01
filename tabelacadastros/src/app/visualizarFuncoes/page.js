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
        <div>
            <div>
                <table>
                    <thead>
                        <tr key="cabecalhoFuncoes">
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosApi.map((funcao) => (
                            <tr key={`${funcao.id}_Linha`}>
                                <th>{funcao.id}</th>
                                <th>{funcao.funcao}</th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}