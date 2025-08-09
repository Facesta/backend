import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { senderId, receiverId, amount, currency, meta } = req.body;

  if (!senderId || !receiverId || !amount || !currency) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check sender's wallet balance
    const senderWallet = await prisma.userWallet.findUnique({
      where: { userId: senderId },
    });

    if (!senderWallet || senderWallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    // Deduct from sender
    await prisma.userWallet.update({
      where: { userId: senderId },
      data: { balance: senderWallet.balance - amount },
    });

    // Add to receiver
    const receiverWallet = await prisma.userWallet.findUnique({
      where: { userId: receiverId },
    });

    if (!receiverWallet) {
      // create wallet if not exists
      await prisma.userWallet.create({
        data: {
          userId: receiverId,
          balance: amount,
          currency,
        },
      });
    } else {
      await prisma.userWallet.update({
        where: { userId: receiverId },
        data: { balance: receiverWallet.balance + amount },
      });
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        senderId,
        receiverId,
        amount,
        currency,
        status: "completed",
        reference: uuidv4(),
        meta: meta || {},
      },
    });

    res.status(201).json({
      message: "Payment sent successfully",
      transactionId: transaction.id,
      reference: transaction.reference,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
