import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/user.js";
import morgan from "morgan";

dotenv.config();

let PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use(morgan("dev"))
app.use(cors())
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
