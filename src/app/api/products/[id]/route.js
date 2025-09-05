import { prisma } from "../../../../lib/prisma";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, price, image, description, roastLevel, origin, category, inStock, featured } = body;

    if (!name || !price) {
      return Response.json({ error: "Name and price are required" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
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

    return Response.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    if (error.code === 'P2025') {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    if (error.code === 'P2002') {
      return Response.json({ error: "Product with this name already exists" }, { status: 400 });
    }
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error.code === 'P2025') {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    return Response.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
