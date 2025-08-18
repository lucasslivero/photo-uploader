import { generatePresignedDownloadUrl } from "@/lib/aws";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ message: "Key required" });
    }

    const url = await generatePresignedDownloadUrl(key);
    res.status(200).json({ url });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ message: "Error generating URL" });
  }
}
