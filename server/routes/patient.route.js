import express from 'express'
import { addPatient, getPatients } from '../controllers/patient.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'


const patientRouter = express.Router()

patientRouter.post('/add', addPatient)
patientRouter.post('/get', authMiddleware ,getPatients)

export default patientRouter