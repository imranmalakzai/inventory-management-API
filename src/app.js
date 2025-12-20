import express from "express";
import { pool } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/env.js";
import errorHandlerMiddleWare from "./middlewares/ApiErrorHandler.js";

//**Import routes Endpoints */
import productRouter from "./routes/product.route.js";
import stockRouter from "./routes/stock.route.js";
import salesRouter from "./routes/sales.route.js";
import saleItemRouter from "./routes/saleItem.route.js";
import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";

//**Swagger setup */
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

//**middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/", productRouter);
app.use("/api/", stockRouter);
app.use("/api/", salesRouter);
app.use("/api/", saleItemRouter);
app.use("/api/", userRouter);
app.use("/api/auth", authRouter);

app.use(
  "/api/docs",
  swaggerUi.serveFiles(swaggerSpec),
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      url: "/api/swagger.json",
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Inventory Management System API");
});
app.use(errorHandlerMiddleWare);

export default app;
