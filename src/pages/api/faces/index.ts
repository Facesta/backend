import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth";

// disable body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  // Basic auth: Expect Authorization: Bearer <accessToken>
  const auth = req.headers.authorization?.split(" ") ?? [];
  const token = auth[0] === "Bearer" ? auth[1] : undefined;
  const decoded = token ? verifyAccessToken(token) : null;
  if (!decoded || typeof decoded === "string")
    return res.status(401).json({ error: "Unauthorized" });
  const userId = (decoded as any).sub as string;

  try {
    const { fields, files } = await parseForm(req);
    const file = files.file as unknown as formidable.File;
    if (!file) return res.status(400).json({ error: "file required" });

    const buffer = await fs.readFile(file.filepath);
    const bucket = process.env.SUPABASE_BUCKET!;
    const key = `faces/${userId}/${Date.now()}-${file.originalFilename}`;

    const { data, error: uploadErr } = await supabase.storage
      .from(bucket)
      .upload(key, buffer, { upsert: false });

    if (uploadErr) {
      console.error(uploadErr);
      return res.status(500).json({ error: "Storage upload failed" });
    }

    const faceProfile = await prisma.faceProfile.create({
      data: {
        userId,
        imageKey: key,
        label: (fields.label as unknown as string) ?? "primary",
        embeddingStatus: "PENDING",
      },
    });

    res.status(201).json({ faceProfile, upload: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}
