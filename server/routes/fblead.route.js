import express from 'express'
import { addFBLead } from '../controllers/fblead.controller.js'

const FBLeadRouter = express.Router()

FBLeadRouter.post('/add', addFBLead)

export default FBLeadRouter