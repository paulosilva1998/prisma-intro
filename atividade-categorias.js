import { prisma } from "./prismaClient.js";

const nome = "Laboratório de Prisma";

const select = {
  categorias: {
    orderBy: { nome: "asc" },
    select: { nome: true },
  },
};

try {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      titulo: "Primeiro post da prática",
      user: { email: "autora.pratica@example.com" },
    },
    orderBy: { id: "asc" },
    select: { id: true },
  });

  const where = { id: post.id };

  const comVinculo = await prisma.post.update({
    where,
    data: {
      categorias: {
        connectOrCreate: { where: { nome }, create: { nome } },
      },
    },
    select,
  });

  console.log(
    "Depois de vincular",
    comVinculo.categorias.map((categoria) => categoria.nome),
  );

  const semVinculo = await prisma.post.update({
    where,
    data: {
      categorias: { disconnect: { nome } },
    },
    select,
  });

  console.log(
    "Depois de desvincular",
    semVinculo.categorias.map((categoria) => categoria.nome),
  );

  const categoria = await prisma.categoria.findUnique({ where: { nome } });
  console.log("Categoria cadastrada", categoria?.nome);
} finally {
  await prisma.$disconnect();
}
