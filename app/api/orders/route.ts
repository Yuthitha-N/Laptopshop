// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAuthFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const filter =
      auth.role === "admin" ? {} : { userId: auth.userId };

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { products, address, paymentMethod } = await request.json();

    if (!products?.length || !address || !paymentMethod) {
      return NextResponse.json(
        { error: "Products, address, and payment method are required" },
        { status: 400 }
      );
    }

    await connectDB();

    let totalPrice = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      totalPrice += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      userId: auth.userId,
      products: orderItems,
      totalPrice,
      address,
      paymentMethod,
      orderStatus: "pending",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
