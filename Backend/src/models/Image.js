const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imagePath: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);
