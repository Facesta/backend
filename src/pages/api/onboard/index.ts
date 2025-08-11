import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/supabase";
import bcryptjs from "bcryptjs";
import { z } from "zod";

const OnboardSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  faceHash: z.string(), // hashed facial encoding from client
  profilePhoto: z.string().optional(), // base64 or file URL
  socialLinks: z
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  paymentMethods: z
    .array(
      z.object({
        provider: z.string(),
        account: z.string(),
      })
    )
    .optional(),
  gesturePin: z.string().optional(),
  defaultScanMode: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const parsed = OnboardSchema.parse(
      typeof req.body === "string" ? JSON.parse(req.body) : req.body
    );

    let profilePhotoUrl: string | undefined;
    if (parsed.profilePhoto) {
      const buffer = Buffer.from(parsed.profilePhoto, "base64");
      profilePhotoUrl = await uploadToS3(
        buffer,
        `profiles/${parsed.email}.jpg`,
        "image/jpeg"
      );
    }

    const hashedPin = parsed.gesturePin
      ? await bcryptjs.hash(parsed.gesturePin, 10)
      : null;

    const newUser = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
          profilePhoto: profilePhotoUrl,
        },
      });

      await tx.faceProfile.create({
        data: {
          userId: user.id,
          faceHash: parsed.faceHash,
        },
      });

      await tx.securitySetting.create({
        data: {
          userId: user.id,
          gesturePin: hashedPin,
          defaultScanMode: parsed.defaultScanMode || null,
        },
      });

      if (parsed.socialLinks?.length) {
        await tx.userLink.createMany({
          data: parsed.socialLinks.map((l) => ({
            userId: user.id,
            type: l.type,
            value: l.value,
          })),
        });
      }

      if (parsed.paymentMethods?.length) {
        await tx.userPaymentMethod.createMany({
          data: parsed.paymentMethods.map((pm) => ({
            userId: user.id,
            provider: pm.provider,
            account: pm.account,
          })),
        });
      }

      return user;
    });

    res.status(201).json({ message: "User onboarded", userId: newUser.id });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
