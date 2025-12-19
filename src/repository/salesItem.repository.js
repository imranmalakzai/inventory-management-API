import { pool } from "../config/db.js";

export const getAllSalesItems = async () => {
  const [rows] = await pool.query("SELECT * FROM sale_items");
  return rows;
};

export const deleteSalesItemsById = async (id) => {
  const result = await pool.query("DELETE FROM sale_items WHERE id = ?", [id]);
  return result.affectedRows;
};

export const getSingleSalesItem = async (id) => {
  const [rows] = await pool.query("SELECT * FROM sale_items WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

export const updateRecord = async (id, data) => {
  const result = await pool.query(
    "UPDATE sale_items SET sale_id = ?, product_id = ?, quantity = ?,selling_price = ?,cost_price = ? WHERE id = ?",
    [
      data.sale_id,
      data.product_id,
      data.quantity,
      data.selling_price,
      data.cost_price,
      id,
    ]
  );
  return result.affectedRows;
};

export const addNewRecord = async (data) => {
  const result = await pool.query(
    "INSERT INTO sale_items (sale_id,product_id,quantity,selling_price,cost_price) VALUES (?,?,?,?,?)",
    [
      data.sale_id,
      data.product_id,
      data.quantity,
      data.selling_price,
      data.cost_price,
    ]
  );
  return result.affectedRows;
};
