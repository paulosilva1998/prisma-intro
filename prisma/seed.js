import { prisma } from "../prismaClient.js";

try {
  for (const nome of ["Node.js", "Banco de Dados"]) {
    await prisma.categoria.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
  }

  await prisma.user.upsert({
    where: { email: "marina@example.com" },
    update: {},
    create: {
      nome: "Marina Costa",
      email: "marina@example.com",
      profile: { create: { bio: "Estudante de ADS." } },
      posts: {
        create: [
          {
            titulo: "Primeiros passos com Prisma",
            conteudo: "Mapeamento de modelos com Prisma.",
            publicado: true,
            categorias: {
              connect: [{ nome: "Node.js" }, { nome: "Banco de Dados" }],
            },
          },
          {
            titulo: "Consultas com MySQL",
            conteudo: "Consulta de dados em um banco relacional.",
            categorias: { connect: { nome: "Banco de Dados" } },
          },
        ],
      },
    },
  });

  console.log("Seed concluído para marina@example.com");
} finally {
  await prisma.$disconnect();
}
