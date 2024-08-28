import express from 'express'
import { addFBLead, compareFBLead } from '../controllers/fblead.controller.js'

const FBLeadRouter = express.Router()

FBLeadRouter.post('/add', addFBLead)
FBLeadRouter.post('/compare', compareFBLead)


export default FBLeadRouter