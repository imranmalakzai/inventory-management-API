import request from "supertest";
import app from "../app.js";

export const getAdminToken = async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "afghanimran92@gmail.com",
    password: "admin@123",
  });

  return res.body.token;
};
