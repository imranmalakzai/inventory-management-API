import request from "supertest";
import app from "../app.js";
import { getAdminToken } from "./setup.js";
import { pool } from "../config/db.js";

describe("Users", () => {
  let token;

  beforeAll(async () => {
    token = await getAdminToken();
  });

  test("create user without Admin Token", async () => {
    const res = await request(app).post("/api/users").send({
      username: "dummy",
      email: "dummy@gmail.com",
      password: "dummy",
      role: "staff",
    });
    expect(res.statusCode).toBe(401);
  });

  // test("create user with Admin token", async () => {
  //   const res = await request(app)
  //     .post("/api/users")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       username: "dummy2",
  //       email: "dummy2@gmail.com",
  //       password: "dummydd",
  //       role: "staff",
  //     });
  //   expect(res.statusCode).toBe(200);
  // });
});

afterAll(async () => {
  await pool.end();
});
