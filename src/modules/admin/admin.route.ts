import express from "express";
import { getDashboardStats } from "./admin.controller";

const router = express.Router();

router.get("/stats", getDashboardStats);

export default router;