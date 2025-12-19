import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asycHandler.js";
import {
  getUserByEmail,
  getUserById,
  updateOwnPassword,
} from "../repository/user.repository.js";

//**login user to there Accounts */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body && req.body;
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError("Invalid credentials", 401);

  const token = await generateToken(user);
  res.status(200).json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});

//**Logout users from Account */
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "loggout successfully" });
});

//**change Own Password */
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await getUserById(req.user && req.user.id);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new ApiError("Invalid Old Password", 401);

  const password = await bcrypt.hash(newPassword, 10);
  const result = await updateOwnPassword(user.id, password);
  if (result === 0) throw new ApiError("Unable to update the password", 403);
  res.status(200).json({ message: "password update successfully" });
});

//** logged In user */
export const me = asyncHandler(async (req, res) => {
  const result = await getUserById(req.user.id);
  res.status(200).json({ ...result });
});
