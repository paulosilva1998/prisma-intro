import { prisma } from "./prismaClient.js";

const email = "autora.pratica@example.com";
const categorias = { connect: { nome: "Banco de Dados" } };

try {
  const autora = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      nome: "Autora da prática",
      email,
      profile: { create: { bio: "Estudante de ADS." } },
      posts: {
        create: [
          {
            titulo: "Primeiro post da prática",
            conteudo: "Exemplo de relacionamento com categorias.",
            categorias,
          },
          {
            titulo: "Segundo post da prática",
            conteudo: "Outro post da mesma autora.",
            categorias,
          },
        ],
      },
    },
    include: {
      profile: true,
      posts: { include: { categorias: true } },
    },
  });

  console.dir(autora, { depth: null });
} finally {
  await prisma.$disconnect();
}
