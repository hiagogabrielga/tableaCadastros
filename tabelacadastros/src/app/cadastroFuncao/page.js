'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { urlPadrao } from "../config.js";

export default function CadastrarFuncoes() {
    const router = useRouter();
    const [funcoes, setFuncoes] = useState({
        funcao: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setFuncoes((prevFuncoes) => ({
            ...prevFuncoes,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const dadosAtualizados = {
                ...funcoes,
                funcao: funcoes.funcao,
            };

            const response = await fetch(`${urlPadrao}/funcoes/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados),
            });

            if (!response.ok) {
                const responseData = await response.text();
                return alert(responseData)
            }

            alert("Função cadastrada com sucesso!");
            router.push("/visualizarFuncoes");
        } catch (error) {
            console.error("Erro ao cadastrar Função:", error);
            alert(`Erro ao cadastrar: ${error.message}`);
        }
    }


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="containerCadastro">
            <div className="containerFormCadastro">
                <h2>Cadastrar função</h2>
                <form onSubmit={handleSubmit} className="formularioCadastro">
                    <div className="containerInputCadastro">
                        <label>Função:</label>
                        <input type="text" name="funcao" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btnCadastro">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
