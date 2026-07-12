import { Router } from "express";

import {
  createEvent,
  getAllEvents,
  deleteEvent,
  getSingleEvent,
} from "./event.controller";


import { verifyJWT } from "../../middleware/verifyJWT";

const router = Router();

router.post("/", verifyJWT, createEvent);

router.get("/", getAllEvents);

router.delete("/:id", verifyJWT, deleteEvent);

router.get("/:id", getSingleEvent);

export default router;