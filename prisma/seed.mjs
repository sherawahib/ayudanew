import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 120);

  const annualFund = await prisma.campaign.upsert({
    where: { slug: "annual-fund" },
    update: {},
    create: {
      title: "Ayuda Miami Annual Fund",
      slug: "annual-fund",
      description: "Help us reach our fundraising goal and support families across Miami-Dade County.",
      goalCents: 4_000_000,
      startDate,
      endDate,
      isActive: true,
      showOnBanner: true,
      sortOrder: 0,
    },
  });

  const legacyFund = await prisma.campaign.upsert({
    where: { slug: "deanne-connolly-graham-legacy-fund" },
    update: {},
    create: {
      title: "DeAnne Connolly Graham Legacy Fund",
      slug: "deanne-connolly-graham-legacy-fund",
      description:
        "Honor DeAnne Connolly-Graham and continue her essential work serving children and families in South Florida.",
      goalCents: 500_000,
      startDate,
      endDate,
      isActive: true,
      showOnBanner: false,
      sortOrder: 1,
    },
  });

  console.log("Campaigns ready:", annualFund.title, "·", legacyFund.title);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
