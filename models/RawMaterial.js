// models/RawMaterial.js
import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema(
  {
    materialId: {
      type: String,
    },
    materialName: {
      type: String,
    },
    unit: {
      type: String,
    },
    defaultUnitPrice: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema);
export default RawMaterial;
