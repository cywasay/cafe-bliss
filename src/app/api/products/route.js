import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const items = await prisma.product.findMany({ orderBy: { id: "asc" } });
    return Response.json(items);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, image, description, roastLevel, origin, category, inStock, featured } = body;

    if (!name || !price) {
      return Response.json({ error: "Name and price are required" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: image || null,
        description: description || null,
        roastLevel: roastLevel || null,
        origin: origin || null,
        category: category || null,
        inStock: inStock !== false,
        featured: featured === true,
      },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    if (error.code === 'P2002') {
      return Response.json({ error: "Product with this name already exists" }, { status: 400 });
    }
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}
