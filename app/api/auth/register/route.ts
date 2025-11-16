import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role = "customer", name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date(),
    });

    const token = await signToken({
      userId: result.insertedId.toString(),
      email,
      role,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      message: "User registered successfully",
      token,
      user: { id: result.insertedId, email, name, role },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
