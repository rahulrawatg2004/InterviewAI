
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";
const app = express();

app.use(cors({
    origin: "https://interviewai-client-m0ia.onrender.com",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview",interviewRouter);
app.use("/api/payment", paymentRouter);
export default app;
