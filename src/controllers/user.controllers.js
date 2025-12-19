import asyncHandler from "../utils/asycHandler.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";

import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserRecord,
  deleteUserRecord,
  createNewUser,
} from "../repository/user.repository.js";

//**Get All Users */
export const getAllUsersControllers = asyncHandler(async (req, res) => {
  const result = await getAllUsers();
  res.status(200).json({ users: result });
});

//**Delete User Record  */
export const deleteUserController = asyncHandler(async (req, res) => {
  const isExist = await getUserById(req.params.id);
  if (!isExist) throw new ApiError("user not exit", 403);
  const result = await deleteUserRecord(req.params.id);
  if (result === 0) throw new ApiError("unable to delete the record");
  res.status(200).json({ message: "Record deleted successfully" });
});

//**update user */
export const updateUserController = asyncHandler(async (req, res) => {
  const isExist = await getUserById(req.user.id);
  if (!isExist) throw new ApiError("user not exit", 403);

  const user = await updateUserRecord(req.user.id, { ...req.body });
  if (user === 0) throw new ApiError("Unable to update the Record", 403);
  res.status(200).json({ message: "Record updated successfully" });
});

//**Get user by Id  */
export const getUserByIdController = asyncHandler(async (req, res) => {
  const result = await getUserById(req.params.id);
  if (!result) throw new ApiError("No User Exist", 404);
  res.status(200).json({ ...result });
});

//**Get A User By Email */
export const getUserByEmailController = asyncHandler(async (req, res) => {
  const result = await getUserByEmail(req.body.email);
  if (!result) throw new ApiError("No User Exist", 404);
  res.status(200).json({ ...result });
});
//**Add New user To the database system */
export const createUserController = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body && req.body;
  if (!username || !email || !password)
    throw new ApiError("All Fields are required");

  const checkIFUserExist = await getUserByEmail(email);
  if (checkIFUserExist) throw new ApiError("user Already Exist", 403);

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await createNewUser({
    username,
    email,
    password: hashPassword,
    role,
  });
  if (user === 0) throw new ApiError("unable to Add new user", 403);

  res.status(200).json({ message: "user Created successfully" });
});
