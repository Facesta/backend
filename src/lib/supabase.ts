import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function uploadToS3(
  fileBuffer: Buffer,
  filePath: string,
  contentType: string
) {
  const { data, error } = await supabase.storage
    .from("facesta-files")
    .upload(filePath, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) throw new Error(error.message);
  return data.path;
}
