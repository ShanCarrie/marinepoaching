import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
const POST_PER_PAGE = 2;
// GET POSTS (Multiple or Single with Pagination and Views Increment)
export const GET = async (req, { params }) => {
  if (params?.slug) {
    const { slug } = params;
    try {
      const post = await prisma.post.update({
        where: { slug },
        data: { views: { increment: 1 } },
        include: { user: true },
      });
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  } else {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const cat = searchParams.get("cat");
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
    };
    try {
      const [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where }),
      ]);
      return new NextResponse(
        JSON.stringify({ posts, count }, { status: 200 })
      );
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  }
};
// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }
  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        desc: body.desc,
        img: body.img,
        catSlug: body.catSlug, // Ensure you're passing the right category slug
        slug: body.slug, // Explicitly set the slug
        userEmail: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
// DELETE POST
export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    await prisma.post.delete({
      where: { slug },
    });
    return new NextResponse(
      JSON.stringify({ message: "Post Deleted!" }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete post!" }, { status: 500 })
    );
  }
};
// UPDATE POST
export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }
  const { slug } = params;
  try {
    const body = await req.json();
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title: body.title,
        desc: body.desc,
        img: body.img,
        catSlug: body.catSlug,
      },
    });
    return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update post!" }, { status: 500 })
    );
  }
};
