// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS REST DE TAREFAS
// ========================================

/**
 * GET /tarefas - Lista todas as tarefas
 * @returns {Array} Lista de tarefas
 */
router.get("/tarefas", TarefaController.listar);

/**
 * GET /tarefas/:id - Obtém uma tarefa específica por ID
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa encontrada ou erro 404
 */
router.get("/tarefas/:id", TarefaController.buscarPorId);

/**
 * POST /tarefas - Cria uma nova tarefa
 * @body {Object} title (obrigatório), description, completed, categoryId
 * @returns {Object} Tarefa criada com status 201
 */
router.post("/tarefas", TarefaController.criar);

/**
 * PUT /tarefas/:id - Atualiza uma tarefa completamente ou parcialmente
 * @param {number} id - ID da tarefa
 * @body {Object} Campos a atualizar: title, description, completed, categoryId
 * @returns {Object} Tarefa atualizada ou erro 404
 */
router.put("/tarefas/:id", TarefaController.atualizar);

/**
 * DELETE /tarefas/:id - Remove uma tarefa
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa removida ou erro 404
 */
router.delete("/tarefas/:id", TarefaController.excluir);

// Exporta o roteador para ser usado no app principal
export default router;
