import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
// Use the new prisma path

export async function GET() {
  try {
    const topViewedPosts = await prisma.post.findMany({
      orderBy: { views: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        img: true,
        catSlug: true,
        createdAt: true,
      },
    });

    return NextResponse.json(topViewedPosts);
  } catch (error) {
    console.error("Error fetching top viewed posts:", error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
