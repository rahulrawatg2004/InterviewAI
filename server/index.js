import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            res.send("Backend is running");
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

startServer();
