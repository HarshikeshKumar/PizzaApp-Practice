import express from "express";
import { PORT } from "./config/serverConfig.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import connectDB from "./config/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);

app.get("/ping", (req, res) => {
  return res.json({
    message: "Pong",
  });
});

app.listen(PORT, async (req, res) => {
  await connectDB();
  console.log(`Server is running at PORT: ${PORT}`);
});
