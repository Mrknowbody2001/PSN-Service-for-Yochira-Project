import mongoose from "mongoose";

const psnSchema = new mongoose.Schema(
  {
    PSNNo: { type: String, required: true, unique: true },
    coNo: { type: String, required: true },
    customerId: { type: String, required: true },

    customerName: { type: String, required: true },
    orderTotalValue: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    remark: { type: String, default: "" },

    // CO Items (products)
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        qty: { type: Number, required: true },
        unitPrice: { type: Number, required: true }, //selling price
        totalValue: { type: Number, required: true }, // from frontend
      },
    ],

    // Extra materials
    extraMaterials: [
      {
        materialId: { type: String, required: true },
        materialName: { type: String, required: true },
        qty: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalValue: { type: Number, required: true }, // from frontend
      },
    ],

    otherCost: { type: Number, default: 0 },
    extraMaterialTotal: { type: Number, required: true }, // from frontend
    finalValue: { type: Number, required: true }, // from frontend
    status: { type: String, default: "pending" },
    finishedPSNDate: { type: Date },
  },

  { timestamps: true }
);

export default mongoose.model("PSN", psnSchema);
