import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    return res.status(200).json({ message: "" });
  }
  if (req.method === "POST") {
    try {
      const file = await Image.create(req.body)
      return res.status(200).json({ message: "Uploaded", data: file });
    } catch (error) {
          console.error("Error creating file:", error);
      return res.status(200).json({ message: "Error uploading" });
    }
  }
}
