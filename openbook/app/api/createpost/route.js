import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  try {
    const { title, body, image, tag, communityId} = await req.json();

    // Basic validation
    if (!title|| !authorId || !communityId || !tag) {
      return NextResponse.json(
        { error: "Title, tag, and community id fields are required." },
        { status: 400 }
      );
    }
    const VALID_TAGS = ["Post", "News", "Tutorial"];
    if (!VALID_TAGS.includes(tag)) {
        return NextResponse.json({ error: "Invalid tag." }, { status: 400 });
    }
    const post = await prisma.post.create({
      data: {
        title:title, 
        body:body, 
        image:image ?? null, 
        tag:tag, 
        authorId:session.user.id, 
        communityId:communityId},
    });
    return NextResponse.json(
      { message: "Post created.", postId: post.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[createpost]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}