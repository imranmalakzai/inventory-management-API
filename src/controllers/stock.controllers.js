import asyncHandler from "../utils/asycHandler.js";
import ApiError from "../utils/apiError.js";
import {
  getAllStockItems,
  getSingleStockItemById,
  addNewItemsToStack,
  deleteStockItemById,
  updateStockItem,
} from "../repository/stock.repository.js";

//**Add new Items to stock */
export const addItemsToStockController = asyncHandler(async (req, res) => {
  const { product_id, quantity, cost_price, added_by } = req.body && req.body;
  if (!product_id || !quantity || !cost_price)
    throw new ApiError("All Fields Are requried", 409);
  const result = await addNewItemsToStack({
    product_id,
    quantity,
    cost_price,
    added_by,
  });
  if (result === 0) throw new ApiError("unable to add product into stock", 500);
  res.status(201).json({ message: "Product added successfully" });
});
//**Get All Items From stocks */
export const getAllStockItms = asyncHandler(async (req, res) => {
  const result = await getAllStockItems();
  res.status(200).json({ products: result });
});
//**Get A single record by Id */
export const getSingleStockItem = asyncHandler(async (req, res) => {
  const result = await getSingleStockItemById(req.params.id);
  if (!result) throw new ApiError("No Item by this Id on stock", 404);
  res.status(200).json({ product: result });
});
//**Delete The Record */
export const deleteRecordById = asyncHandler(async (req, res) => {
  const isProductExist = await getSingleStockItemById(req.params.id);
  if (!isProductExist)
    throw new ApiError("No product exist by this id in stock", 404);
  const result = await deleteStockItemById(req.params.id);
  if (result === 0) throw new ApiError("unable to delete the record", 404);
  res.status(200).json({ message: "Record deleted successfully" });
});

//**update A record */
export const updateStockItemById = asyncHandler(async (req, res) => {
  const isProductExist = await getSingleStockItemById(req.params.id);
  if (!isProductExist)
    throw new ApiError("No product exist by this id in stock", 404);
  const result = await updateStockItem(req.params.id, { ...req.body });
  if (result === 0) {
    throw new ApiError("unable to update the product in stock", 404);
  }
  res.status(200).json({ message: "product updated successfully" });
});
