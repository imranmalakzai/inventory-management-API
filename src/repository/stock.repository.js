import { pool } from "../config/db.js";

export const getAllStockItems = async () => {
  const [rows] = await pool.query("SELECT * FROM stock");
  return rows;
};

export const getSingleStockItemById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM stock WHERE id = ?", [id]);
  return rows[0];
};

export const addNewItemsToStack = async (data) => {
  const result = await pool.query(
    "INSERT INTO stock (product_id,quantity,cost_price,added_by) VALUES (?,?,?,?)",
    [data.product_id, data.quantity, data.cost_price, data.added_by]
  );
  return result.insertId;
};

export const deleteStockItemById = async (id) => {
  const result = await pool.query("DELETE FROM stock WHERE id = ?", [id]);
  return result.affectedRows;
};

export const updateStockItem = async (id, data) => {
  const result = await pool.query(
    "UPDATE stock SET product_id = ?, quantity = ?, cost_price = ?, added_by = ? WHERE id = ?",
    [data.product_id, data.quantity, data.cost_price, data.added_by, id]
  );
  return result.affectedRows;
};
