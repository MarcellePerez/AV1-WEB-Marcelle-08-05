import { useEffect, useState } from "react";

import Header from "./components/Header";
import TarefaForm from "./components/TarefaForm";
import TarefaTabela from "./components/TarefaTabela";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);

  async function carregarTarefas() {
    try {
      const response = await fetch("http://localhost:3000/tarefas");
      const data = await response.json();

      setTarefas(data.dados);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function cadastrarTarefa(event) {
    event.preventDefault();

    console.log("CLICOU NO BOTÃO");

    if (!descricao.trim()) return;
    await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: descricao,
        description: descricao,
      }),
    });

    setDescricao("");

    carregarTarefas();
  }
  async function excluirTarefa(id) {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE",
    });

    carregarTarefas();
  }
  async function editarTarefa(tarefa) {
    console.log("EDITAR", tarefa);

    const novoTitulo = prompt("Novo título:", tarefa.title);

    if (!novoTitulo) return;

    await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: novoTitulo,
        description: tarefa.description,
      }),
    });

    carregarTarefas();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="container mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Sistema de Tarefas
        </h1>

        <TarefaForm
          descricao={descricao}
          setDescricao={setDescricao}
          cadastrarTarefa={cadastrarTarefa}
        />

        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <TarefaTabela
            tarefas={tarefas}
            excluirTarefa={excluirTarefa}
            editarTarefa={editarTarefa}
          />
        )}
      </section>
    </div>
  );
}
