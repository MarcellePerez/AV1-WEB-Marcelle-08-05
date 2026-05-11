import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function obterTodasTarefas() {
  return await prisma.task.findMany();
}

export async function obterTarefaPorId(id) {
  return await prisma.task.findUnique({ where: { id } });
}

export async function criarNovaTarefa(descricao) {
  const data = {
    title: descricao.trim(),
    description: '',
    completed: false
  };
  return await prisma.task.create({ data });
}

export async function atualizarTarefa(id, novaDescricao, novoStatus) {
  const data = {};
  if (novaDescricao !== undefined) data.title = novaDescricao.trim();
  if (novoStatus !== undefined) data.completed = novoStatus;

  try {
    return await prisma.task.update({ where: { id }, data });
  } catch (e) {
    return null;
  }
}

export async function excluirTarefa(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (e) {
    return null;
  }
}
