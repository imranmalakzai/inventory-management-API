import request from "supertest";
import app from "../app.js";
import { getAdminToken } from "./setup.js";
import { pool } from "../config/db.js";

describe("PRODUCT API", () => {
  let token;

  beforeAll(async () => {
    token = await getAdminToken();
  });

  test("Block access without token", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(401);
  });

  test("Get products with token", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await pool.end();
});
