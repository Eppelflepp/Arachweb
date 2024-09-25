// follow.ts
import { ObjectId } from 'mongodb';
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        console.log(`Received request method: ${req.method}`);
        const { userId } = req.body; 
        const { currentUser } = await serverAuth(req, res);
        
        console.log(`Current User ID: ${currentUser.id}, Trying to ${req.method === 'POST' ? 'follow' : 'unfollow'} User ID: ${userId}`);

        if (!userId || typeof userId !== 'string' || userId === currentUser.id) {
            console.log("Invalid ID or self-follow attempt");
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const userToFollow = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userToFollow) {
            console.log("User to follow not found");
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`Current following IDs before update: ${currentUser.followingIds}`);

        let updatedFollowingIds = [...(currentUser.followingIds || [])];

        if (req.method === 'POST') {
            if (!updatedFollowingIds.includes(userId)) {
                updatedFollowingIds.push(userId);
                console.log(`User ${currentUser.id} is now following ${userId}`);
                
                await prisma.notification.create({
                    data: {
                        body: `@${currentUser.username} started following you!`,
                        userId,
                    }
                });
            } else {
                console.log(`User ${currentUser.id} already follows ${userId}`);
            }
        } else if (req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter(id => id !== userId);
            console.log(`User ${currentUser.id} unfollowed ${userId}`);
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { followingIds: updatedFollowingIds },
        });

        console.log(`Updated following IDs: ${updatedUser.followingIds}`);
        return res.status(200).json(updatedUser);

    } catch (error) {
        console.error('Error in follow handler:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}