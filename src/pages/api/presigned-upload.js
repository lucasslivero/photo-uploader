import { generatePresignedUploadUrl } from "@/lib/aws";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { filename, contentType } = req.body;

    if (!filename || !contentType) {
      return res.status(400).json({ message: "Filename and contentType required" });
    }

    const url = await generatePresignedUploadUrl(filename, contentType);
    res.status(200).json({ url });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ message: "Error generating URL" });
  }
}
