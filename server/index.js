import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/api/config/db.js";

const startServer = async () => {
  await connectDB();

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
