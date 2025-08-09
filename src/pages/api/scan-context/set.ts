import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { userId, contextId } = req.body;
  if (!userId || !contextId)
    return res.status(400).json({ error: "userId and contextId are required" });

  try {
    // Store active context in device_sessions
    const session = await prisma.deviceSession.upsert({
      where: { userId },
      update: { activeContextId: contextId },
      create: {
        userId,
        activeContextId: contextId,
      },
    });

    res.status(200).json({ message: "Context updated", session });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
