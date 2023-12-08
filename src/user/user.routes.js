import { Router } from 'express';
import { changePassword, login, register } from './user.controller.js';
import { protect } from './user.middleware.js';

export const router = Router()

router.post('/login', login)

router.post('/register', register)

router.patch('/change-password', protect, changePassword)