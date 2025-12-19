import { pool } from "../config/db.js";

export const createNewUser = async (data) => {
  const result = await pool.query(
    "INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)",
    [data.username, data.email, data.password, data.role || "staff"]
  );
  return result.affectedRows;
};

export const updateOwnPassword = async (id, password) => {
  const result = await pool.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, id]
  );
  return result.affectedRows;
};

export const updateUserRecord = async (id, data) => {
  const result = await pool.query(
    "UPDATE users SET username = ?, email = ?  WHERE id = ?",
    [data.username, data.email, id]
  );
  return result.affectedRows;
};

export const deleteUserRecord = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};

export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};
