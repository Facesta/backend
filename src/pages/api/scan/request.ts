import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

async function getAllowedActions(userId: string) {
  const session = await prisma.deviceSession.findUnique({
    where: { userId },
    include: { activeContext: true },
  });

  if (!session?.activeContext) return [];

  // Pull rules from user_scan_rules
  const rules = await prisma.userScanRule.findMany({
    where: {
      userId,
      context: session.activeContext.name,
    },
  });

  // Merge allowed actions from rules
  return rules.flatMap((r) => r.allowedActions);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { scannerId, targetId, type, amount, currency, note } = req.body;
  if (!scannerId || !targetId || !type) {
    return res
      .status(400)
      .json({ error: "scannerId, targetId, and type are required" });
  }

  try {
    // Get allowed actions for both users
    const scannerAllowed = await getAllowedActions(scannerId);
    const targetAllowed = await getAllowedActions(targetId);

    // Find intersection
    const allowedIntersection = scannerAllowed.filter((a) =>
      targetAllowed.includes(a)
    );

    if (!allowedIntersection.includes(type)) {
      return res
        .status(403)
        .json({ error: "This action is not allowed in current contexts" });
    }

    // If payment, check amount & limits
    if (type === "payment" && amount) {
      const targetSession = await prisma.deviceSession.findUnique({
        where: { userId: targetId },
        include: { activeContext: true },
      });

      const limits =
        targetSession?.activeContext?.context_rules?.payment_limits;
      if (limits && amount > limits.max_amount) {
        return res.status(403).json({ error: "Amount exceeds allowed limit" });
      }
    }

    // Store request
    const request = await prisma.pendingRequest.create({
      data: {
        scannerId,
        targetId,
        type,
        amount: amount || null,
        currency: currency || null,
        note: note || null,
        status: "pending",
      },
    });

    // TODO: trigger push notification / WS to target user here

    res.status(200).json({ message: "Request created", request });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
