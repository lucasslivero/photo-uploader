import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  key: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
