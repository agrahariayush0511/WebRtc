import express from 'express'
import {authController, activateController} from '../controllers'
import auth from '../middlewares/auth-middleware'

const router = express.Router()

router.post('/api/send-otp', authController.sendOtp)

router.post('/api/verify-otp', authController.verifyOtp)

router.post('/api/activate',auth, activateController.activate)

router.get('/api/refresh', authController.refresh)

router.post('/api/logout',auth, authController.logout)



export default router