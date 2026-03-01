// app/api/auth/register/route.ts
// Handles new user registration from your SignupPage component.
// POST /api/auth/register

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  try {
    const { community} = await req.json();
    // Basic validation
    if (!community) {
      return NextResponse.json(
        { error: "community id field is required." },
        { status: 400 }
      );
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


    const post = await prisma.communitymember.create({
      data: {
        authorId:session.user.id, 
        communityId:communityId.id},
    });
    return NextResponse.json(
      { message: "Membership Established.", postId: post.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Join Community]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}