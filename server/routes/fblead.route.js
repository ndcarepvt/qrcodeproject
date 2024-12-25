import express from 'express'
import { addFBLead, addFBLeadInternational, FBLeadInternational, FBLeadNational } from '../controllers/fblead.controller.js'

const FBLeadRouter = express.Router()

FBLeadRouter.post('/add', addFBLead)
FBLeadRouter.post('/addint', addFBLeadInternational)
FBLeadRouter.get('/get', FBLeadNational)
FBLeadRouter.get('/getint', FBLeadInternational)


export default FBLeadRouter