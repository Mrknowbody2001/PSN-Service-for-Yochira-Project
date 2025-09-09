import PSN from "../models/PSN.js";

const generatePSNNumber = async () => {
  const count = await PSN.countDocuments();
  const nextNumber = count + 1;
  return `psn-${String(nextNumber).padStart(4, "0")}`; // e.g., CO-0001
};

export default generatePSNNumber;
