import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  try {
    const { title, body, image, tag, community} = await req.json();
    // Basic validation
    if (!title|| !body || !community || !tag) {
      return NextResponse.json(
        { error: "Title, tag, and community id fields are required." },
        { status: 400 }
      );
    }
    const VALID_TAGS = ["Post", "Project", "Tutorial"];
    if (!VALID_TAGS.includes(tag)) {
        return NextResponse.json({ error: "Invalid tag." }, { status: 400 });
    }
    const communityId = await prisma.community.findUnique({
        where: {name:community}
    });
    if (!communityId){
        return NextResponse.json(
            {message: "Could not resolve community id", communityName:community},
            {status: 500}
        )
    }


    const post = await prisma.post.create({
      data: {
        title:title, 
        body:body, 
        image:image ?? null,
        likes: 0,
        tag:tag, 
        authorId:session.user.id, 
        communityId:communityId.id},
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