import dbConnect from "@/lib/mongodb";
import Image from "@/models/Image";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const images = await Image.find({});
      res.status(200).json({ success: true, data: images });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
