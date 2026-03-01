// app/api/auth/register/route.ts
// Handles new user registration from your SignupPage component.
// POST /api/auth/register

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check for existing user
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email or username is already taken." },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, name: username },
    });

    return NextResponse.json(
      { message: "Account created.", userId: user.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
