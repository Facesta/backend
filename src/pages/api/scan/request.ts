import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

async function getAllowedActions(userId: string) {
  const session = await prisma.deviceSession.findUnique({
    where: { id: userId },
    include: { activeContext: true },
  });

  if (!session?.activeContext) return [];

  // Pull rules from user_scan_rules
  const rules = await prisma.userScanRule.findMany({
    where: {
      userId,
      scanMode: { context: session.activeContext?.context },
    },
    include: {
      scanMode: {
        include: { allowedActions: true },
      },
    },
  });

  // Now TypeScript knows scanMode.allowedActions exists
  return rules.flatMap((r) => r.scanMode.allowedActions);
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
    // Ensure both are arrays before comparing
    const allowedIntersection =
      Array.isArray(scannerAllowed) && Array.isArray(targetAllowed)
        ? scannerAllowed.filter((a) => targetAllowed.includes(a))
        : [];

    if (!allowedIntersection.includes(type)) {
      return res
        .status(403)
        .json({ error: "This action is not allowed in current contexts" });
    }

    // If payment, check amount & limits
    if (type === "payment" && amount) {
      const targetSession = await prisma.deviceSession.findFirst({
        where: { userId: targetId },
        include: { activeContext: true },
      });

      type ContextRules = {
        payment_limits?: {
          max_amount?: number;
        };
      };

      const rules = targetSession?.context_rules as ContextRules | undefined;

      const limits = rules?.payment_limits;
      if (limits && amount > (limits.max_amount ?? 0)) {
        return res.status(403).json({ error: "Amount exceeds allowed limit" });
      }
    }

    // Store request
    const request = await prisma.pendingRequest.create({
      data: {
        requesterId: scannerId,
        targetId,
        type,
        amount: amount || null,
        currency: currency || null,
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
