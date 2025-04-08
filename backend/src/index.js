import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import { server } from "./app.js"; // Import the server from app.js

dotenv.config({
  path: "./.env", // Path to your .env file
});

ConnectDB()
  .then(() => {
    server.on("error", (err) => {
      console.error("Server error:", err);
    });

    const PORT = process.env.PORT || 2000;

    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
