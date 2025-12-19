import asyncHandler from "../utils/asycHandler.js";
import ApiError from "../utils/apiError.js";

//**Import products Repost */
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../repository/product.repository.js";

//**Get All Products */
export const getAllProductsController = asyncHandler(async (req, res) => {
  const result = await getAllProducts();
  if (!result) throw new ApiError("No product exist", 404);
  res.status(200).json({ products: result });
});

//** Delete a product */
export const deleteProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProduct(id);
  if (!result) throw new ApiError("Product not exist on this id");
  res.status(200).json({ message: "product deleted successfully" });
});

//** update a products */
export const updateProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isProductExist = await getProductById(id);
  if (!isProductExist) throw new ApiError("Product not exist on this id", 404);
  const { name, selling_price, quantity } = req.body ? req.body : "";
  const result = await updateProduct(id, { name, selling_price, quantity });
  if (!result) throw new ApiError("Unable to update product", 400);
  res.status(200).json({ message: "product updated successfully" });
});

//**Get a sinlge product */
export const getProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError("No province id found", 404);
  const result = await getProductById(id);
  if (!result) throw new ApiError("product not exist by this id", 404);
  res.status(200).json({ product: result });
});

//** Add A new product */
export const createProductController = asyncHandler(async (req, res) => {
  const { name, selling_price, quantity } = req.body ? req.body : "";
  if (!name || !selling_price || !quantity) {
    throw new ApiError("All field are requried", 409);
  }
  const result = await createProduct({ name, selling_price, quantity });
  if (!result) {
    throw new ApiError("unable to create New product", 400);
  }
  res.status(201).json({ message: "product created successfully" });
});
