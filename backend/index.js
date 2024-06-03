import express from "express";
import  {configDotenv}  from "dotenv";
import authRoutes from "./Routes/auth.js";
import mongoConnect from "./db/mongoConnect.js";

configDotenv();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    mongoConnect();
    console.log(`Server is running on port http://localhost:${port}/`);
});