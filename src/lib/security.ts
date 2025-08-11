import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * Verify the given PIN against the stored hash in SecuritySetting.
 */
export async function verifyPin(userId: string, pin: string): Promise<boolean> {
  const security = await prisma.securitySetting.findFirst({
    where: { userId },
    select: { gesturePin: true },
  });

  if (!security?.gesturePin) return false;

  return await bcrypt.compare(pin, security.gesturePin);
}

/**
 * Verify that a gesture exists for the user in the Gesture table.
 */
export async function verifyGesture(
  userId: string,
  gestureId: string
): Promise<boolean> {
  const gesture = await prisma.gesture.findFirst({
    where: { userId, id: gestureId },
  });

  return !!gesture;
}
