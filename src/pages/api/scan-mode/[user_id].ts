import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "Missing required field: user_id" });
  }

  try {
    // 1. Get user's scan mode rules
    const userRules = await prisma.userScanRule.findMany({
      where: { userId: String(user_id) },
      include: {
        scanMode: true,
      },
    });

    // 2. Get active scan context (if any)
    const activeContext = await prisma.scanContext.findFirst({
      where: { userId: String(user_id), isActive: true },
    });

    res.status(200).json({
      user_id,
      active_context: activeContext || null,
      scan_modes: userRules.map((rule) => ({
        id: rule.scanMode.id,
        name: rule.scanMode.name,
        description: rule.scanMode.description,
        allowed_actions: rule.allowedActions,
        context: rule.context,
      })),
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
