import asyncHandler from "../utils/asycHandler.js";
import ApiError from "../utils/apiError.js";
import {
  addNewSales,
  deleteSalesById,
  updateSales,
  getAllsales,
  getSalesById,
} from "../repository/sales.repository.js";

//**Get All Sales Records */
export const getAllSalesRecordControllers = asyncHandler(async (req, res) => {
  const result = await getAllsales();
  res.status(200).json({ sales: result });
});
//**GET Sales Record by Id */
export const getSalesRecordByIdController = asyncHandler(async (req, res) => {
  const result = await getSalesById(req.params.id);
  if (!result) throw new ApiError("No Record exist by this Id", 404);
  res.status(200).json({ sales: result });
});

//**Add A new Sales Record */
export const createSalesController = asyncHandler(async (req, res) => {
  const { user_id, total_amount } = req.body && req.body;
  if (!user_id || !total_amount)
    throw new ApiError("All Feilds are required", 409);
  const result = await addNewSales({ user_id, total_amount });
  if (result === 0) {
    throw new ApiError("unable to add new sales", 409);
  }
  res.status(201).json({ message: "New sales added successfully" });
});
//**Update A Sales Record */
export const updateSalesController = asyncHandler(async (req, res) => {
  const isSalesExist = await getSalesById(req.params.id);
  if (!isSalesExist) throw new ApiError("Sales Record not exist", 404);
  const result = await updateSales(req.params.id, { ...req.body });
  if (result === 0) throw new ApiError("unable to delete any record", 409);
  res.status(200).json({ message: "Record updated successfully" });
});
//**Delete A Sales Record */
export const deleteSalesRecord = asyncHandler(async (req, res) => {
  const isSalesExist = await getSalesById(req.params.id);
  if (!isSalesExist) throw new ApiError("Sales Record not exist", 404);
  const result = await deleteSalesById(req.params.id);
  if (result === 0) throw new ApiError("unable to delete record", 409);
  res.status(200).json({ message: "record deleted successfully" });
});
