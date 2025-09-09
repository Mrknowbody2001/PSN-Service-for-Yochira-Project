import MaterialStore from "../models/MaterialStore.js";
import MaterialTransactions from "../models/MaterialTransactions.js";
import PSN from "../models/PSN.js";
import generatePSNNumber from "../utils/PSNNo.js";

export const getPSNNumber = async (req, res, next) => {
  try {
    const PSNNo = await generatePSNNumber();
    res.status(200).json({ PSNNo });
  } catch (error) {
    next(error);
  }
};

export const createPSN = async (req, res, next) => {
  try {
    const {
      CONo,
      customerId,
      customerName,
      orderTotalValue,
      orderDate,
      remark,
      PSNNo,
      items,
      extraMaterials,
      otherCost,
      extraMaterialTotal,
      finalValue,
    } = req.body;

    // Validate required fields
    if (!items || !extraMaterials)
      return res
        .status(400)
        .json({ message: "Items and extraMaterials are required" });

    // ✅ Create PSN
    const newPSN = await PSN.create({
      PSNNo,
      coNo: CONo,
      customerId,
      customerName,
      orderTotalValue,
      orderDate,
      remark,
      items, // assume frontend sends correct product fields
      extraMaterials, // assume frontend sends correct material fields
      otherCost: Number(otherCost || 0),
      extraMaterialTotal: Number(extraMaterialTotal || 0),
      finalValue: Number(finalValue || 0),
      status: "pending",
    });

    // ✅ Update stock only for extra materials
    for (const mat of extraMaterials) {
      const { materialId, qty } = mat;
      if (!materialId || !qty) continue;

      const storeItem = await MaterialStore.findOne({ materialId });
      if (!storeItem) {
        return res
          .status(400)
          .json({ message: `Material ${materialId} not found in store.` });
      }

      if (storeItem.currentStock < qty) {
        return res.status(400).json({
          message: `Not enough stock for ${materialId}. Available: ${storeItem.currentStock}`,
        });
      }

      storeItem.currentStock -= qty;
      storeItem.lastUpdated = new Date();
      await storeItem.save();

      await MaterialTransactions.create({
        materialId,
        materialName: storeItem.materialName,
        qty,
        uom: storeItem.uom,
        unitPrice: storeItem.unitPrice,
        type: "ISSUE",
        referenceNo: PSNNo,
        remark: "Stock updated via PSN creation",
      });
    }

    res.status(200).json({
      message: "PSN created and stock updated successfully",
      data: newPSN,
    });
  } catch (error) {
    console.error("Error creating PSN:", error.message);
    next(error);
  }
};

//get all psn

export const getAllPSN = async (req, res, next) => {
  try {
    const allPSN = await PSN.find();
    res.status(200).json(allPSN);
  } catch (error) {
    next(error);
  }
};

// get all started psn
export const getStartedPSN = async (req, res, next) => {
  try {
    const startedPSN = await PSN.find({ status: "started" });
    res.status(200).json(startedPSN);
    console.log(startedPSN);
  } catch (error) {
    next(error);
  }
};

//get one started PSN
// ✅ Get one started PSN by ID
export const getOneStartedPSN = async (req, res, next) => {
  try {
    const { id } = req.params;

    const psn = await PSN.findOne({ _id: id, status: "started" });
    if (!psn) {
      return res.status(404).json({ message: "started PSN not found" });
    }

    res.status(200).json(psn);
  } catch (error) {
    console.error("Error fetching one started PSN:", error.message);
    next(error);
  }
};

//!get pending psn

export const getPendingPSN = async (req, res, next) => {
  try {
    const pendingPSN = await PSN.find({ status: "pending" });
    res.status(200).json(pendingPSN);
  } catch (error) {
    next(error);
  }
};
//! get one pending psn

export const getOnePendingPSN = async (req, res, next) => {
  try {
    const { id } = req.params;

    const psn = await PSN.findOne({ _id: id, status: "pending" });
    if (!psn) {
      return res.status(404).json({ message: "Pending PSN not found" });
    }

    res.status(200).json(psn);
  } catch (error) {
    console.error("Error fetching one started PSN:", error.message);
    next(error);
  }
};
//! psn start  function
export const approvePsn = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { finishedDate } = req.body;

    const psn = await PSN.findById(id);
    if (!psn) return res.status(404).json({ message: "PSN not found" });

    psn.status = "started";
    // psn.finishedDate = finishedDate ? new Date(finishedDate) : new Date(); // ✅ Use provided date or fallback
    await psn.save();

    res.status(200).json({ message: "PSN marked as Started", psn });
  } catch (error) {
    console.error("Error Starting PSN:", error.message);
    next(error);
  }
};

// finish PSn
export const finishPSN = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { finishedDate } = req.body;

    // Update directly without triggering full validation
    const psn = await PSN.findByIdAndUpdate(
      id,
      {
        status: "finished",
        finishedPSNDate: finishedDate ? new Date(finishedDate) : new Date(),
      },
      { new: true, runValidators: false } // ⬅️ important change
    );

    if (!psn) {
      return res.status(404).json({ message: "PSN not found" });
    }

    res.status(200).json({ message: "PSN marked as finished", psn });
  } catch (error) {
    console.error("Error finishing PSN:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid PSN ID" });
    }

    next(error);
  }
};

//get all finished psn
export const getFinishedPSN = async (req, res, next) => {
  try {
    const finishedPSN = await PSN.find({ status: "finished" });
    res.status(200).json(finishedPSN);
  } catch (error) {
    next(error);
  }
};
