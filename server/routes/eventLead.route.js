import express from "express";
import { addEventLead } from "../controllers/eventLead.controller.js";

const eventLeadRouter = express.Router()

eventLeadRouter.post('/add', addEventLead)

export default eventLeadRouter;