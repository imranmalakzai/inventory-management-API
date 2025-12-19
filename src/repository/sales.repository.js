import { pool } from "../config/db.js";

export const getAllsales = async () => {
  const [rows] = await pool.query("SELECT * FROM sales");
  return rows;
};

export const getSalesById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM sales WHERE id = ?", [id]);
  return rows[0];
};

export const deleteSalesById = async (id) => {
  const result = await pool.query("DELETE FROM sales WHERE id = ?", [id]);
  return result.affectedRows;
};

export const addNewSales = async (data) => {
  const result = await pool.query(
    "INSERT INTO sales (user_id,total_amount) VALUES (?,?)",
    [data.user_id, data.total_amount]
  );
  return result.affectedRows;
};

export const updateSales = async (id, data) => {
  const result = await pool.query(
    "UPDATE sales SET user_id = ?, total_amount = ? WHERE id = ?",
    [data.user_id, data.total_amount, id]
  );
  return result.affectedRows;
};
