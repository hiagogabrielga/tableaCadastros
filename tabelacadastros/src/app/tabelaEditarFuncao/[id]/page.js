'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { urlPadrao } from "../../config.js";

export default function EditarFuncoes() {
    const router = useRouter();
    const { id } = useParams();
    const [funcoes, setFuncoes] = useState({
        funcao: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar os dados do usuário
    useEffect(() => {
        async function buscarFuncoes() {
            try {
                const response = await fetch(`${urlPadrao}/funcoes/${id}`);
                if (!response.ok) {
                    throw new Error(`Erro ao carregar funcoes: ${response.status}`);
                }
                const data = await response.json();
                setFuncoes({
                    funcao: data.funcao ?? ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar funções:", error);
                setError(error.message);
                setLoading(false);
            }
        }
        buscarFuncoes();
    }, [id]);

    // Atualizar os campos conforme o usuário digita
    function handleChange(event) {
        const { name, value } = event.target;
        setFuncoes((prevFuncoes) => ({
            ...prevFuncoes,
            [name]: value,
        }));
    }

    // Enviar os dados atualizados para a API
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const dadosAtualizados = {
                ...funcoes,
                funcao: funcoes.funcao, // Converte funcao para número
            };

            const response = await fetch(`${urlPadrao}/funcoes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados),
            });

            if (!response.ok) {
                const responseData = await response.text();
                return alert(responseData)
            }

            alert("Função atualizada com sucesso!");
            router.push("/editarFuncao");
        } catch (error) {
            console.error("Erro ao atualizar função:", error);
            alert(`Erro ao atualizar: ${error.message}`);
        }
    }


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="containerEdit">
            <div className="containerFormEdit">
                <h2>Editar função</h2>
                <form onSubmit={handleSubmit} className="formularioEdit">
                    <div className="containerInputEdit">
                        <label>Função:</label>
                        <input type="text" name="funcao" value={funcoes.funcao ?? ""} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btnEditar">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}
