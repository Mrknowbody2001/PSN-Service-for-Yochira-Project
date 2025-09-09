import mongoose from "mongoose";

const MaterialStoreSchema = new mongoose.Schema(
  {
    materialId: { type: String, required: true, unique: true },
    materialName: { type: String, required: true },
    currentStock: { type: Number, default: 0 },
    uom: { type: String }, // unit of measure
    unitPrice: { type: Number, default: 0 }, // add unit price
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("MaterialStore", MaterialStoreSchema);
