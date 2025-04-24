import { NextResponse } from "next/server";
import { Feed } from "rss";
import prisma from "@/utils/connect"; // Adjust path as needed

export const GET = async () => {
  try {
    // 1. Get posts
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // 2. Create feed
    const feed = new Feed({
      title: "Marine Poaching Blog",
      description: "Marine conservation insights and updates",
      id: "https://marinepoaching.com",
      link: "https://marinepoaching.com",
      language: "en",
      favicon: "https://marinepoaching.com/favicon.ico",
      updated: new Date(),
    });

    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `https://marinepoaching.com/posts/${post.slug}`,
        link: `https://marinepoaching.com/posts/${post.slug}`,
        description: post.desc || "No description available",
        date: new Date(post.createdAt),
      });
    });

    // 3. Return response
    return new NextResponse(feed.rss2(), {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml",
      },
    });
  } catch (err) {
    console.error("RSS Feed Error:", err);
    return new NextResponse("Failed to generate RSS feed", { status: 500 });
  }
};
