import express from 'express'
import { addFBLead, addFBLeadInternational } from '../controllers/fblead.controller.js'

const FBLeadRouter = express.Router()

FBLeadRouter.post('/add', addFBLead)
FBLeadRouter.post('/addint', addFBLeadInternational)


export default FBLeadRouter