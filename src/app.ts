import express, { Application, Request, Response } from "express";
import cors from "cors";
import adminRoutes from "./modules/admin/admin.route";
import eventRoutes from "./modules/events/event.route";

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://eventhubclient-gixw.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.use("/api/events", eventRoutes);
// Test Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

export default app;