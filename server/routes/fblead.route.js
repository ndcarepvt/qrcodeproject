import express from 'express'
import { addFBLead, addFBLeadInternational, FBLeadInternational, FBLeadNational, getFBLeadCounts, getFBLeadDateFilter, ozentolCall } from '../controllers/fblead.controller.js'
import { authMiddleware, leadMiddleware } from '../middlewares/auth.middleware.js'

const FBLeadRouter = express.Router()

FBLeadRouter.post('/add', addFBLead)
FBLeadRouter.post('/addint', addFBLeadInternational)
FBLeadRouter.get('/get', leadMiddleware, FBLeadNational)
FBLeadRouter.get('/getint', leadMiddleware, FBLeadInternational)
FBLeadRouter.get('/getfilter', leadMiddleware, getFBLeadDateFilter)
FBLeadRouter.get('/count', getFBLeadCounts)
FBLeadRouter.get('/calltest', ozentolCall)


export default FBLeadRouter