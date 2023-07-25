// /pages/api/posts/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth"; // Import the serverAuth middleware
import prisma from "@/libs/prismadb";

const itemsPerPage = 5; // Set the number of posts per page

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Use serverAuth middleware to get currentUser if authentication is required
    const { currentUser } = await serverAuth(req, res);

    const { userId } = req.query;
    const page = parseInt(req.query.page as string) || 1; // Get the requested page number

    let posts;

    if (userId && typeof userId === "string") {
      // Use currentUser.id to filter posts if needed
      posts = await prisma.post.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          user: true,
          comments: true,
        },
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
