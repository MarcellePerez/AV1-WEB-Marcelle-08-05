// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Retorna todas as tarefas em formato JSON
 * @route GET /tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    res.json({
      sucesso: true,
      dados: tarefas,
      total: tarefas.length,
    });
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao listar tarefas',
    });
  }
}

/**
 * Retorna uma tarefa específica com base no id enviado na URL
 * @route GET /tarefas/:id
 */
export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    // Valida se o id é um número válido
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({
        sucesso: false,
        erro: 'ID inválido',
      });
    }

    const tarefa = await TarefaModel.buscarPorId(id);

    // Se não encontrar, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        erro: 'Tarefa não encontrada',
      });
    }

    res.json({
      sucesso: true,
      dados: tarefa,
    });
  } catch (error) {
    console.error('Erro ao buscar tarefa por ID:', error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao buscar tarefa',
    });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criar(req, res) {
  try {
    const { title, description, completed, categoryId } = req.body;

    // Valida se o título foi enviado corretamente
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        sucesso: false,
        erro: 'Título é obrigatório e deve ser uma string não-vazia',
      });
    }

    // Valida campos opcionais se fornecidos
    if (description && typeof description !== 'string') {
      return res.status(400).json({
        sucesso: false,
        erro: 'Descrição deve ser uma string',
      });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        sucesso: false,
        erro: 'Completed deve ser um booleano',
      });
    }

    if (categoryId !== undefined && (!Number.isInteger(categoryId) || categoryId <= 0)) {
      return res.status(400).json({
        sucesso: false,
        erro: 'CategoryId deve ser um número inteiro positivo',
      });
    }

    // Cria a nova tarefa através do Model
    const tarefa = await TarefaModel.criar({
      title,
      description,
      completed,
      categoryId,
    });

    // Retorna status 201 (criado com sucesso)
    res.status(201).json({
      sucesso: true,
      mensagem: 'Tarefa criada com sucesso',
      dados: tarefa,
    });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao criar tarefa',
    });
  }
}

/**
 * Atualiza parcialmente uma tarefa existente
 * @route PUT /tarefas/:id
 */
export async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed, categoryId } = req.body;

    // Valida o id
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({
        sucesso: false,
        erro: 'ID inválido',
      });
    }

    // Valida campos opcionais se fornecidos
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Título deve ser uma string não-vazia',
      });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({
        sucesso: false,
        erro: 'Descrição deve ser uma string',
      });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        sucesso: false,
        erro: 'Completed deve ser um booleano',
      });
    }

    if (categoryId !== undefined && categoryId !== null && (!Number.isInteger(categoryId) || categoryId <= 0)) {
      return res.status(400).json({
        sucesso: false,
        erro: 'CategoryId deve ser um número inteiro positivo',
      });
    }

    // Tenta atualizar a tarefa através do Model
    const tarefa = await TarefaModel.atualizar(id, {
      title,
      description,
      completed,
      categoryId,
    });

    // Se não encontrar a tarefa, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        erro: 'Tarefa não encontrada',
      });
    }

    res.json({
      sucesso: true,
      mensagem: 'Tarefa atualizada com sucesso',
      dados: tarefa,
    });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao atualizar tarefa',
    });
  }
}

/**
 * Remove uma tarefa pelo id
 * @route DELETE /tarefas/:id
 */
export async function excluir(req, res) {
  try {
    const { id } = req.params;

    // Valida o id
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({
        sucesso: false,
        erro: 'ID inválido',
      });
    }

    // Tenta excluir a tarefa através do Model
    const tarefa = await TarefaModel.excluir(id);

    // Se não encontrar, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        erro: 'Tarefa não encontrada',
      });
    }

    res.json({
      sucesso: true,
      mensagem: 'Tarefa excluída com sucesso',
      dados: tarefa,
    });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro ao excluir tarefa',
    });
  }
}
