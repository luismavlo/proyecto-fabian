import { Router } from 'express';
import { createGuest, deleteGuest, findAllGuest } from './guest.controller.js';

export const router = Router()

router.route('/')
  .get(findAllGuest)
  .post(createGuest)

router.route('/:id')
  .delete(deleteGuest)

