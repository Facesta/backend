import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.query;
  const context = req.query.context as string | undefined;

  if (!user_id || typeof user_id !== "string") {
    return res.status(400).json({ error: "Invalid or missing user_id" });
  }

  try {
    // Step 1: Get the user’s scan mode
    const scanMode = await prisma.scanMode.findFirst({
      where: {
        userScanRules: {
          some: { userId: user_id }
        }
      },
      include: {
        allowedActions: true // hypothetical relation
      }
    });

    if (!scanMode) {
      return res.status(404).json({ error: "No scan mode found for user" });
    }

    // Step 2: Filter actions by context (if provided)
    let allowedActions = scanMode.allowedActions || [];
    if (context) {
      allowedActions = allowedActions.filter(
        a => a.context === context || a.context === "any"
      );
    }

    res.status(200).json({
      userId: user_id,
      scanMode: scanMode.name,
      actions: allowedActions.map(a => ({
        type: a.type,
        value: a.value
      }))
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
