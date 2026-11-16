import { prisma } from "./prismaClient.js";

const email = "usuario.pratica@example.com";
const where = { email };

try {
  // CREATE
  const criado = await prisma.user.create({
    data: { nome: "Usuário da prática", email },
  });
  console.log("Cadastro", criado.nome, criado.email);

  // READ
  const usuarios = await prisma.user.findMany({
    select: { nome: true, email: true },
  });
  console.log("Lista", usuarios);

  // UPDATE
  const atualizado = await prisma.user.update({
    where,
    data: { nome: "Usuário atualizado" },
  });
  console.log("Nome após atualização", atualizado.nome);

  const conferido = await prisma.user.findUnique({ where });
  console.log("Consulta após atualização", conferido?.nome);

  // DELETE
  await prisma.user.delete({ where });
  const consultaFinal = await prisma.user.findUnique({ where });
  console.log("Busca após exclusão", consultaFinal);
} finally {
  await prisma.$disconnect();
}
