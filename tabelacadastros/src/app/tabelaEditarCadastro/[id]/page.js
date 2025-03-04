'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { urlPadrao } from "../../config.js";

export default function EditarCadastro() {
    const router = useRouter();
    const { id } = useParams();
    const [cadastro, setCadastro] = useState({
        nome: "",
        email: "",
        telefone: "",
        funcao: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar os dados do usuário
    useEffect(() => {
        async function buscarCadastro() {
            try {
                const response = await fetch(`${urlPadrao}/cadastros/${id}`);
                if (!response.ok) {
                    throw new Error(`Erro ao carregar cadastro: ${response.status}`);
                }
                const data = await response.json();
                setCadastro({
                    nome: data.nome ?? "",
                    email: data.email ?? "",
                    telefone: data.telefone ?? "",
                    funcao: data.funcao ?? ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar cadastro:", error);
                setError(error.message);
                setLoading(false);
            }
        }
        buscarCadastro();
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCadastro((prevCadastro) => ({
            ...prevCadastro,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const dadosAtualizados = {
                ...cadastro,
                funcao: Number(cadastro.funcao),
            };

            const response = await fetch(`${urlPadrao}/cadastros/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados),
            });

            if (!response.ok) {
                const responseData = await response.text();
                return alert(responseData)
            }

            alert("Cadastro atualizado com sucesso!");
            router.push("/editarUsuario");
        } catch (error) {
            console.error("Erro ao atualizar cadastro:", error);
            alert(`Erro ao atualizar: ${error.message}`);
        }
    }


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="containerEdit">
            <div className="containerFormEdit">
                <h2>Editar Cadastro</h2>
                <form onSubmit={handleSubmit} className="formularioEdit">
                    <div className="containerInputEdit">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={cadastro.nome ?? ""} onChange={handleChange} required />
                    </div>
                    <div className="containerInputEdit">
                        <label>Email:</label>
                        <input type="email" name="email" value={cadastro.email ?? ""} onChange={handleChange} required />
                    </div>
                    <div className="containerInputEdit">
                        <label>Telefone:</label>
                        <input type="text" name="telefone" value={cadastro.telefone ?? ""} onChange={handleChange} required />
                    </div>
                    <div className="containerInputEdit">
                        <label>Função:</label>
                        <input type="number" name="funcao" value={cadastro.funcao ?? ""} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btnEditar">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}


