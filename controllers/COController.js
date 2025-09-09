import CustomerOrder from "../models/CustomerOrder.js";

//get all approved customer orders
export const getApprovedCo = async (req, res, next) => {
  try {
    const approvedCoList = await CustomerOrder.find({ status: "approved" });
    res.status(200).json(approvedCoList);
  } catch (error) {
    next(error);
  }
};

//get one customer details in one CO
export const getCustomerOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find CO by its ID
    const customerOrder = await CustomerOrder.findById(id);
    

    if (!customerOrder) {
      return res.status(404).json({ message: "Customer Order not found" });
    }

    res.status(200).json(customerOrder);
  } catch (error) {
    next(error);
  }
};
