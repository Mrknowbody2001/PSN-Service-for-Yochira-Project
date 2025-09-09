import mongoose from "mongoose";

const MaterialTransactionSchema = new mongoose.Schema(
  {
    materialId: { type: String, required: true },
    materialName: { type: String, required: true },
    qty: { type: Number, required: true },
    uom: { type: String },
    unitPrice: { type: Number, default: 0 }, // add unit price
    type: { type: String, enum: ["RECEIVE", "ISSUE"], required: true },
    referenceNo: { type: String }, // e.g., SORN No
    remark: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("MaterialTransaction", MaterialTransactionSchema);
