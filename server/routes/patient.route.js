import express from 'express'
import { addPatient, getPatients, otpSent } from '../controllers/patient.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'


const patientRouter = express.Router()

patientRouter.post('/add', addPatient)
patientRouter.post('/get', authMiddleware ,getPatients)
patientRouter.post('/verify-number', otpSent)
// patientRouter.post('/addverify', addPatientVerify)

export default patientRouter