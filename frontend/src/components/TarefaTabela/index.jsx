export default function TarefaTabela({ tarefas, excluirTarefa, editarTarefa }) {
  return (
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Descrição</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td className="px-4 py-3">{tarefa.id}</td>

              <td className="px-4 py-3">{tarefa.title}</td>

              <td className="px-4 py-3">{tarefa.description}</td>

              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => editarTarefa(tarefa)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => excluirTarefa(tarefa.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
