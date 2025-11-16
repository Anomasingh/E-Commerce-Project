import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const db = await getDatabase();
    const productsCollection = db.collection("products");

    let query: Record<string, any> = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const products = await productsCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await productsCollection.countDocuments(query);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { getCurrentUser } = await import("@/lib/auth");
    const user = await getCurrentUser();

    if (!user || (user.role !== "admin" && user.role !== "vendor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const productData = await request.json();
    const db = await getDatabase();
    const productsCollection = db.collection("products");

    const result = await productsCollection.insertOne({
      ...productData,
      vendorId: user.userId,
      createdAt: new Date(),
    });

    return NextResponse.json({
      id: result.insertedId,
      ...productData,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
