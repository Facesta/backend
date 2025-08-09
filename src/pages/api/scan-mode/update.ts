import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, scanModeId, allowedActions, context } = req.body;

  if (!userId || !scanModeId) {
    return res
      .status(400)
      .json({ error: "Missing required fields: userId and scanModeId" });
  }

  try {
    // Check if rule already exists
    const existingRule = await prisma.userScanRule.findFirst({
      where: {
        userId,
        scanModeId,
        context: context || null,
      },
    });

    let rule;
    if (existingRule) {
      // Update existing rule
      rule = await prisma.userScanRule.update({
        where: { id: existingRule.id },
        data: {
          allowedActions,
          context: context || null,
        },
      });
    } else {
      // Create new rule
      rule = await prisma.userScanRule.create({
        data: {
          userId,
          scanModeId,
          allowedActions,
          context: context || null,
        },
      });
    }

    res.status(200).json({
      message: "Scan mode updated successfully",
      rule,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
