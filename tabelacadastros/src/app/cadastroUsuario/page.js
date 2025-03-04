'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { urlPadrao } from "../config.js";


export default function CadastrarUsuario() {
    const router = useRouter();
    const [cadastro, setCadastro] = useState({
        nome: "",
        email: "",
        telefone: "",
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
                funcao: Number(cadastro.funcao), // Converte funcao para número
            };

            const response = await fetch(`${urlPadrao}/cadastros/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados),
            });

            if (!response.ok) {
                const responseData = await response.text();
                return alert(responseData)
            }

            alert("Cadastro feito com sucesso!");
            router.push("/visualizarUsuarios");
        } catch (error) {
            console.error("Erro ao fazer cadastro:", error);
            alert(`Erro ao cadastrar: ${error.message}`);
        }
    }


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="containerCadastro">
            <div className="containerFormCadastro">
                <h2>Cadastrar usuário</h2>
                <form onSubmit={handleSubmit} className="formularioCadastro">
                    <div className="containerInputCadastro">
                        <label>Nome:</label>
                        <input type="text" name="nome" onChange={handleChange} required />
                    </div>
                    <div className="containerInputCadastro">
                        <label>Email:</label>
                        <input type="email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="containerInputCadastro">
                        <label>Telefone:</label>
                        <input type="text" name="telefone" onChange={handleChange} required />
                    </div>
                    <div className="containerInputCadastro">
                        <label>Função:</label>
                        <input type="number" name="funcao" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btnCadastro">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}