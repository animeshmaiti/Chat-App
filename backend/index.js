import express from "express";
import  {configDotenv}  from "dotenv";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messageRoutes.js";
import mongoConnect from "./db/mongoConnect.js";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
    mongoConnect();
    console.log(`Server is running on port http://localhost:${port}/`);
});