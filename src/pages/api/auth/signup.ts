import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  signAccessToken,
  generateRefreshTokenPlain,
  createRefreshToken,
} from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password, name } = req.body ?? {};
  if (!email || !password)
    return res.status(400).json({ error: "email and password required" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "User already exists" });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  const accessToken = signAccessToken(user.id);
  const refreshPlain = generateRefreshTokenPlain();
  await createRefreshToken(
    user.id,
    refreshPlain,
    req.headers["x-forwarded-for"] as string | undefined,
    req.headers["user-agent"] as string | undefined
  );

  // For mobile apps: return both tokens (client stores refresh securely)
  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken: refreshPlain,
  });
}
