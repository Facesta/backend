import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const IdentifySchema = z.object({
  faceHash: z.string(),
  context: z.string().optional(), // e.g., "conference", "mall"
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { faceHash, context } = IdentifySchema.parse(req.body);

    // Step 1: Find matching face profile
    const faceProfile = await prisma.faceProfile.findFirst({
      where: { encryptedVector: faceHash },
    });

    if (!faceProfile) {
      return res.status(404).json({ error: "No match found" });
    }

    // Step 2: Get user details
    const user = await prisma.user.findUnique({
      where: { id: faceProfile.userId },
      select: {
        id: true,
        name: true,
        email: true,
        profilePhoto: true,
      },
    });

    // Step 3: Get scan mode (global or user-specific)
    const scanMode = await prisma.scanMode.findFirst({
      where: {
        rules: {
          some: { userId: user?.id },
        },
      },
      include: {
        allowedActions: true,
      },
    });

    // Step 4: Filter actions based on context if provided
    let allowedActions = scanMode?.allowedActions || [];
    if (context) {
      allowedActions = allowedActions.filter(
        (a: any) => a.context === context || a.context === "any"
      );
    }

    res.status(200).json({
      user,
      scanMode: scanMode?.name || "default",
      actions: allowedActions.map((a) => ({
        type: a.type,
        value: a.value,
      })),
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
