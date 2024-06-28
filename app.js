import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

const app = express();
dotenv.config({ path: "./config/config.env" })

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  
  app.use('/api/v1/user', userRouter);
  app.use("/api/v1/application", applicationRouter);
  app.use("/api/v1/job", jobRouter);

  dbConnection();
  app.use(errorMiddleware);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  });

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});