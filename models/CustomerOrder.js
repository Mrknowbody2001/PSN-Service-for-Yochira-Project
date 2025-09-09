import mongoose from "mongoose";

const customerOrderSchema = new mongoose.Schema(
  {
    coNo: { type: String,  unique: true },

    customerId: {
      type: String,
      ref: "Customer",
      
    },
    customerName: { type: String },

    items: [
      {
        productId: {
          type: String, // manual string ID (not ObjectId)
          
        },
        productName: { type: String },
        barcode: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        subCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubCategory",
        },
        orderQty: { type: Number,  },
        sellingPrice: { type: Number },
        itemTotalValue: { type: Number }, // ✅ renamed from totalValue
      },
    ],

    orderTotalValue: { type: Number,  }, // ✅ renamed for clarity

    paymentStatus: {
      type: String,
      enum: ["Cash", "Card", "Cheque"],
      default: "Cash",
    },
    remark: { type: String },
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerOrder", customerOrderSchema);
