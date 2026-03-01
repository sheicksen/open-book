import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, description } = await req.json();

    // Basic validation
    if (!name|| !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check for existing community by that name
    const existing = await prisma.user.findFirst({
      where:  {name },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Community name is already taken." },
        { status: 409 }
      );
    }

    const community = await prisma.user.create({
      data: {name:name, description:description },
    });

    return NextResponse.json(
      { message: "Community created.", communityId: community.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[createcommunity]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}