import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  { name: "Espresso", price: 3, image: "espresso.jpg" },
  { name: "Cappuccino", price: 4, image: "cappuccino.jpg" },
  { name: "Latte", price: 5, image: "latte.jpg" },
  { name: "Colombian Roast", price: 6, image: "colombian.jpg" },
];

async function main() {
  console.log("Seeding database...");
  
  // Create default admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "owner@coffee.com" },
    create: {
      email: "owner@coffee.com",
      password: adminPassword,
      name: "Admin",
      role: "admin",
    },
    update: {
      password: adminPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("✓ Admin user created");

  // Seed products
  console.log("Seeding products...");
  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      create: {
        name: p.name,
        price: Number(p.price),
        image: p.image ?? null,
        inStock: true,
      },
      update: {
        price: Number(p.price),
        image: p.image ?? null,
        inStock: true,
      },
    });
  }
  console.log("✓ Products seeded");
  
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


