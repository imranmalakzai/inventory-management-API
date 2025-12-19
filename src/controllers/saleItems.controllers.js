import asyncHandler from "../utils/asycHandler.js";
import ApiError from "../utils/apiError.js";
import {
  getAllSalesItems,
  getSingleSalesItem,
  updateRecord,
  deleteSalesItemsById,
  addNewRecord,
} from "../repository/salesItem.repository.js";

export const getAllSalesItemsController = asyncHandler(async (req, res) => {
  const result = await getAllSalesItems();
  res.status(200).json({ sale_items: result });
});

export const getSaleItemByIdController = asyncHandler(async (req, res) => {
  const result = await getSingleSalesItem(req.params.id);
  if (!result) throw new ApiError("No Record found by this id", 404);
  res.status(200).json({ ...result });
});

export const createSaleItemController = asyncHandler(async (req, res) => {
  const { sale_id, product_id, quantity, selling_price, cost_price } =
    req.body && req.body;
  if (!sale_id || !product_id || !quantity || !selling_price || !cost_price) {
    throw new ApiError("All Field Are required", 404);
  }
  const result = await addNewRecord({ ...req.body });
  if (result === 0)
    throw new ApiError("unable to Add new sale Item Record", 403);
  res.status(201).json({ message: "Sale Item Record Added successfully" });
});

export const updateSaleItemController = asyncHandler(async (req, res) => {
  const isExist = await getSingleSalesItem(req.params.id);
  if (!isExist) throw new ApiError("No product exist by this Id", 400);
  const result = await updateRecord(req.params.id, { ...req.body });
  if (result === 0) throw new ApiError("unable to updte the record", 403);
  res.status(200).json({ message: "Record update successfully" });
});

export const deleteSaleItemController = asyncHandler(async (req, res) => {
  const isExist = await getSingleSalesItem(req.params.id);
  if (!isExist) throw new ApiError("No product exist by this Id", 400);
  const result = await deleteSalesItemsById(req.params.id);
  if (result === 0) throw new ApiError("unable to delete Record", 400);
  res.status(200).json({ message: "Record deleeted successfully" });
});
