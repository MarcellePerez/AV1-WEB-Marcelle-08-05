// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================
// Esta camada é responsável por:
// - Realizar operações CRUD no banco de dados usando Prisma
// - Implementar a lógica de negócio

import { prisma } from "../config/prisma.js";

// ========== CRUD - TAREFAS ==========

/**
 * Lista todas as tarefas
 * @returns {Promise<Array>} - Array de tarefas
 */
export async function listar() {
  try {
    const tarefas = await prisma.task.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tarefas;
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    throw error;
  }
}

/**
 * Busca uma tarefa pelo ID
 * @param {number} id - ID da tarefa
 * @returns {Promise<Object|null>} - A tarefa encontrada ou null
 */
export async function buscarPorId(id) {
  try {
    const tarefa = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });
    return tarefa || null;
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    console.error('Erro ao buscar tarefa por ID:', error);
    throw error;
  }
}

/**
 * Cria uma nova tarefa usando Prisma
 * @param {Object} dados - Dados da tarefa (title, description, categoryId)
 * @returns {Promise<Object>} - A tarefa criada
 */
export async function criar(dados) {
  try {
    const tarefa = await prisma.task.create({
      data: {
        title: dados.title.trim(),
        description: dados.description ? dados.description.trim() : null,
        completed: dados.completed || false,
        categoryId: dados.categoryId || null,
      },
      include: {
        category: true,
      },
    });
    return tarefa;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
}

/**
 * Atualiza uma tarefa (atualização parcial)
 * @param {number} id - ID da tarefa
 * @param {Object} dados - Dados a atualizar (title, description, completed, categoryId)
 * @returns {Promise<Object|null>} - A tarefa atualizada ou null se não encontrar
 */
export async function atualizar(id, dados) {
  try {
    // Verificar se a tarefa existe
    const tarefaExistente = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!tarefaExistente) {
      return null;
    }

    // Preparar dados para atualização (apenas campos fornecidos)
    const dataUpdate = {};
    if (dados.title !== undefined) dataUpdate.title = dados.title.trim();
    if (dados.description !== undefined) dataUpdate.description = dados.description ? dados.description.trim() : null;
    if (dados.completed !== undefined) dataUpdate.completed = dados.completed;
    if (dados.categoryId !== undefined) dataUpdate.categoryId = dados.categoryId;

    const tarefa = await prisma.task.update({
      where: { id: parseInt(id) },
      data: dataUpdate,
      include: {
        category: true,
      },
    });
    return tarefa;
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
}

/**
 * Exclui uma tarefa pelo ID
 * @param {number} id - ID da tarefa a ser excluída
 * @returns {Promise<Object|null>} - A tarefa removida ou null se não encontrar
 */
export async function excluir(id) {
  try {
    // Verificar se a tarefa existe
    const tarefaExistente = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!tarefaExistente) {
      return null;
    }

    const tarefa = await prisma.task.delete({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });
    return tarefa;
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    console.error('Erro ao excluir tarefa:', error);
    throw error;
  }
}