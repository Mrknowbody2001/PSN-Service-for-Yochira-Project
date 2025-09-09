import RawMaterial from "../models/RawMaterial.js";

export const searchRawMaterials = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive search
    const materials = await RawMaterial.find({
      $or: [{ materialName: regex }, { materialId: regex }],
    }).limit(10); // Limit results to 10

    res.status(200).json(materials);
  } catch (error) {
    console.error("Error searching raw materials:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
