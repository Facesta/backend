import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { verifyPin, verifyGesture } from "@/lib/security"; // We'll define later

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const { approverId, pin, gestureData } = req.body;

  if (!approverId) {
    return res.status(400).json({ error: "Approver ID required" });
  }

  try {
    // 1. Find pending request
    const request = await prisma.pendingRequest.findUnique({
      where: { id: String(id) },
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ error: "Request is not pending" });
    }

    if (request.targetId !== approverId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to approve this request" });
    }

    // 2. Security Checks
    const pinValid = pin ? await verifyPin(approverId, pin) : true;
    const gestureValid = gestureData
      ? await verifyGesture(approverId, gestureData)
      : true;

    if (!pinValid || !gestureValid) {
      return res.status(401).json({ error: "Security verification failed" });
    }

    // 3. Approve Request
    await prisma.pendingRequest.update({
      where: { id: String(id) },
      data: { status: "approved" },
    });

    await prisma.approval.create({
      data: {
        requestId: String(id),
        approverId,
        method: pin && gestureData ? "both" : pin ? "pin" : "gesture",
        reason: "User rejected request",
        approver: { connect: { id: approverId } },
      },
    });

    // 4. If payment → Create Transaction
    if (request.type === "payment" && request.amount && request.currency) {
      await prisma.transaction.create({
        data: {
          senderId: request.requesterId,
          receiverId: request.targetId,
          amount: request.amount,
          currency: request.currency,
          reference: `ref-${Date.now()}`,
        },
      });
    }

    res.status(200).json({ message: "Request approved successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
