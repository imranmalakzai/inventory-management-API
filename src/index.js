import app from "./app.js";
import { PORT } from "./config/env.js";
import { pool } from "./config/db.js";

// Test database connection on server start

app.listen(PORT, () => {
  console.log("server is listing to port 5000...");
});
