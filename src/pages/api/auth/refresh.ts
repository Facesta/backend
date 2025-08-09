import type { NextApiRequest, NextApiResponse } from "next";
import {
  findRefreshToken,
  revokeRefreshToken,
  signAccessToken,
  generateRefreshTokenPlain,
  createRefreshToken,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { refreshToken } = req.body ?? {};
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });

  const record = await findRefreshToken(refreshToken);
  if (!record || record.revoked || record.expiresAt < new Date()) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  // rotate: revoke old and issue new
  await revokeRefreshToken(record.id);
  const newPlain = generateRefreshTokenPlain();
  await createRefreshToken(
    record.userId,
    newPlain,
    req.headers["x-forwarded-for"] as string | undefined,
    req.headers["user-agent"] as string | undefined
  );

  const accessToken = signAccessToken(record.userId);
  return res.status(200).json({ accessToken, refreshToken: newPlain });
}
