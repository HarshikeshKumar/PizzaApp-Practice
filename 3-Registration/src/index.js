import express from "express";
import { PORT } from "./config/serverConfig.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import isLoggedIn from "./validation/authValidator.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Access cookie in backend
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);

// Iss API ko koi tb hi access krr skta hai jb wo Logged in ho
app.get("/ping", isLoggedIn, (req, res) => {
  console.log(req.body);
  // Cookie ko access krr raha hu check krne ke liye access ho raha hai ya nhi
  console.log(req.cookies);
  return res.json({
    message: "Pong",
  });
});

app.listen(PORT, async (req, res) => {
  await connectDB();
  console.log(`Server is running at PORT: ${PORT}`);
});
