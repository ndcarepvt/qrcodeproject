import express from "express";
import { addBookSlot, getAllBookSlots, updateBookSlot } from "../controllers/bookedSlots.controller.js";

const otherRouter = express.Router();

// POST route to add a new booking slot
otherRouter.post("/addBookslot", addBookSlot);

// GET route to fetch all booking slots
otherRouter.get("/getBookSlot", getAllBookSlots);

// PUT route to update a booking slot by ID
otherRouter.put("/updateBookSlot", updateBookSlot);

export default otherRouter;
