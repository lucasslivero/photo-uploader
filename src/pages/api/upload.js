export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Hi :)" });
  }
  if (req.method === "POST") {
    try {

      return res.status(200).json({ message: "Uploaded" });
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: "Error uploading" });
    }
  }
}
