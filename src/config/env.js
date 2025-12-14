import dotenv from "dotenv";
dotenv.configDotenv({ path: `.env.${"development" || "production"}.local` });

export const { HOST_URI, DB_password, DB_USER, DB_NAME } = process.env;
