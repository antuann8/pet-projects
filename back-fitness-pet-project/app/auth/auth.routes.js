import express from 'express'

import { AuthUser, RegisterUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(AuthUser)
router.route('/register').post(RegisterUser)

export default router
