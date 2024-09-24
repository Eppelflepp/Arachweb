import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method not allowed
  }

  try {
    // Parse limit from query parameters
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 if not provided

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: limit, // Limit the number of results returned
      select: {
        id: true,
        name: true,
        username: true,
        // Add other fields you want to include
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).end(); // Bad request
  }
}
