import { prisma } from "../../../lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ orders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer, total } = body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "items is required and must be a non-empty array" }, { status: 400 });
    }

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          total: typeof total === "number" ? total : 0,
          status: "received",
        },
      });

      // Create order items
      const orderItems = await Promise.all(
        items.map((item) =>
          tx.orderItem.create({
            data: {
              quantity: item.quantity || 1,
              price: item.price || 0,
              productId: parseInt(item.productId),
              orderId: newOrder.id,
            },
          })
        )
      );

      return {
        ...newOrder,
        items: orderItems,
      };
    });

    return Response.json({ id: order.id, order }, { status: 201 });
  } catch (err) {
    console.error("Order creation error:", err);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}


