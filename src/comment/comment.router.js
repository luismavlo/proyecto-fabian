import express from 'express';
import { createComment, deleteComment } from './comment.controller.js';

export const router = express.Router();

router.route('/')
      .post(createComment)

router.route('/:id')
      .delete(deleteComment)


