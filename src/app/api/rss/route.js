import { generateRss } from "@/utils/rss";
import { connectDB } from "@/utils/db";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export async function GET() {
  await connectDB();

  try {
    const posts = await Post.find();
    const rss = await generateRss(posts);

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return new Response("Failed to fetch posts", { status: 500 });
  }
  
}
