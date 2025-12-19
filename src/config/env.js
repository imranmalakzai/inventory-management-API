import dotenv from "dotenv";
dotenv.configDotenv({ path: `.env.${"development" || "production"}.local` });

export const {
  HOSTED_URI,
  HOST_URI,
  DB_password,
  JWT_SECRET,
  DB_USER,
  DB_NAME,
  PORT,
} = process.env;
