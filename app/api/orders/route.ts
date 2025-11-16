import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderData = await request.json();
    const db = await getDatabase();
    const ordersCollection = db.collection("orders");

    const result = await ordersCollection.insertOne({
      ...orderData,
      userId: user.userId,
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({
      id: result.insertedId,
      ...orderData,
      status: "pending",
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();
    const ordersCollection = db.collection("orders");

    const orders = await ordersCollection
      .find({ userId: user.userId })
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
