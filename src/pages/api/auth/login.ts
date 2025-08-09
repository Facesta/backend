import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import {
  comparePassword,
  signAccessToken,
  generateRefreshTokenPlain,
  createRefreshToken,
} from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body ?? {};
  if (!email || !password)
    return res.status(400).json({ error: "email and password required" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = signAccessToken(user.id);
  const refreshPlain = generateRefreshTokenPlain();
  await createRefreshToken(
    user.id,
    refreshPlain,
    req.headers["x-forwarded-for"] as string | undefined,
    req.headers["user-agent"] as string | undefined
  );

  res.status(200).json({
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken: refreshPlain,
  });
}
