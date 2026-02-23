import express from "express";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.get("/ping", (req, res) => {
  return res.json({
    message: "Pong",
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is Started at PORT: ${PORT}`);
});
