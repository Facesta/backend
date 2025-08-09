import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "./prisma";

const ACCESS_TOKEN_EXP = "15m"; // adjust as needed
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");

export function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXP,
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateRefreshTokenPlain() {
  return crypto.randomBytes(64).toString("hex");
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Persist a refresh token (hashed) to DB
 */
export async function createRefreshToken(
  userId: string,
  tokenPlain: string,
  ip?: string,
  userAgent?: string
) {
  const tokenHash = hashToken(tokenPlain);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000);
  return prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ip,
      userAgent,
    },
  });
}

/**
 * Find refresh token record by plain token (hash lookup)
 */
export async function findRefreshToken(tokenPlain: string) {
  const tokenHash = hashToken(tokenPlain);
  return prisma.refreshToken.findUnique({
    where: { tokenHash },
  });
}

/**
 * Revoke a refresh token by id
 */
export async function revokeRefreshToken(id: string) {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
}
