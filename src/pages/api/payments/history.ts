import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, status, limit, startDate, endDate } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing required field: userId" });
  }

  try {
    const filters: any = {
      OR: [{ senderId: String(userId) }, { receiverId: String(userId) }],
    };

    if (status) {
      filters.status = String(status);
    }

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(String(startDate));
      if (endDate) filters.createdAt.lte = new Date(String(endDate));
    }

    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(String(limit)) : 50,
      include: {
        // If you have a User model, you can return names/emails
        sender: true,
        receiver: true,
      },
    });

    res.status(200).json({
      count: transactions.length,
      transactions,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
