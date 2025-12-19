import { pool } from "../config/db.js";

export const getAllProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0]; // single product
};

export const createProduct = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO products (name,selling_price,quantity) VALUES (?,?,?)",
    [data.name, data.selling_price, data.quantity]
  );
  return result.insertId; // return the new product ID
};

export const updateProduct = async (id, data) => {
  const [result] = await pool.query(
    "UPDATE products SET name = ?, selling_price = ?, quantity = ? WHERE id = ?",
    [data.name, data.selling_price, data.quantity, id]
  );
  return result.affectedRows; // return how many rows updated
};

export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows; // return how many rows deleted
};
