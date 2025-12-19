import request from "supertest";
import { pool } from "../config/db.js";
import app from "../app.js";

describe("AUTH API", () => {
  test("✅ Login returns JWT token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "afghanimran92@gmail.com",
      password: "admin@123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

describe("AUTH API", () => {
  test("Unauthorize", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "dummy@gmail.com",
      password: "admin@123",
    });

    expect(res.statusCode).toBe(401);
    // expect(res.body.token).toBeDefined();
  });
});

afterAll(async () => {
  await pool.end();
});
