import { PrismaClient } from "@prisma/client";
import products from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding products...");
  // Normalize product fields for schema
  const data = products.map((p) => ({
    id: undefined,
    name: p.name,
    price: Number(p.price),
    image: p.image || null,
    description: p.description || null,
    roastLevel: p.roastLevel || null,
    origin: p.origin || null,
    category: p.category || null,
    inStock: p.inStock !== false,
    featured: Boolean(p.featured),
  }));

  // Upsert by name to avoid duplicates
  for (const p of data) {
    await prisma.product.upsert({
      where: { name: p.name },
      create: p,
      update: p,
    });
  }

  console.log("Seeding done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
