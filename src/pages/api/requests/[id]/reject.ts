import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const { approverId, reason } = req.body;

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
        .json({ error: "You are not authorized to reject this request" });
    }

    // 2. Update status to rejected
    await prisma.pendingRequest.update({
      where: { id: String(id) },
      data: { status: "rejected" },
    });

    // 3. Log in approvals table
    await prisma.approval.create({
      data: {
        requestId: String(id),
        approverId,
        method: "rejected", // keeping same column for tracking
      },
    });

    // Optional: store rejection reason
    if (reason) {
      await prisma.approval.updateMany({
        where: { requestId: String(id), approverId },
        data: { reason },
      });
    }

    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
