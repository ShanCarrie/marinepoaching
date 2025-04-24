import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
const RSS = require("rss"); // <-- Fixed import

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const feed = new RSS({
      title: "Marine Poaching Blog",
      description: "Marine conservation stories and updates",
      id: "https://marinepoaching.com",
      link: "https://marinepoaching.com",
      language: "en",
      favicon: "https://marinepoaching.com/favicon.ico",
      updated: new Date(),
    });

    posts.forEach((item) => {
      feed.item({
        title: item.title,
        guid: item.slug,
        url: `https://marinepoaching.com/posts/${item.slug}`,
        description: item.desc?.substring(0, 180) || "No description.",
        date: new Date(item.createdAt),
      });
    });

    return new NextResponse(feed.xml(), {
      status: 200,
      headers: {
        "Content-Type": "text/rss+xml",
      },
    });
  } catch (err) {
    console.error("RSS error:", err);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
};
